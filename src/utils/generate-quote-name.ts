export async function generateQuoteName(lob: string): Promise<string> {
  const now = new Date();

  const year = String(now.getFullYear()).slice(2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const dateTimePart = `${year}${month}${day}${hours}${minutes}${seconds}`;
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number

  return `ASI-${lob}-${dateTimePart}${randomPart}`;
}
