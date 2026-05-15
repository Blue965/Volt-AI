import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const projectRoot = process.cwd();
const allowedDirs = [
  path.join(projectRoot, "src", "components"),
  path.join(projectRoot, "src", "app"),
];

function isAllowedPath(filePath: string) {
  const normalized = path.normalize(filePath);
  return allowedDirs.some((dir) => {
    const normalizedDir = path.normalize(dir) + path.sep;
    return normalized === dir || normalized.startsWith(normalizedDir);
  });
}

async function gatherTsxFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await gatherTsxFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      files.push(path.relative(projectRoot, entryPath).replace(/\\/g, "/"));
    }
  }

  return files;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get("file");

  if (!file) {
    const files = [] as string[];
    for (const dir of allowedDirs) {
      files.push(...(await gatherTsxFiles(dir)));
    }
    return NextResponse.json({ files: files.sort() });
  }

  const requestedPath = path.join(projectRoot, file);
  if (!requestedPath.endsWith(".tsx") || !isAllowedPath(requestedPath)) {
    return NextResponse.json({ error: "Invalid file path." }, { status: 400 });
  }

  try {
    const content = await fs.readFile(requestedPath, "utf-8");
    return NextResponse.json({ file, content });
  } catch (error) {
    return NextResponse.json({ error: "Unable to read file." }, { status: 500 });
  }
}
