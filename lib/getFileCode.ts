import { readFileSync } from 'fs';
import path from 'path';

export default function getFileCode(relativePath: string): string {
  const filePath = path.join(process.cwd(), relativePath);
  return readFileSync(filePath, 'utf-8');
}

