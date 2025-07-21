export const csvBufferToJson = (buffer: Buffer): Record<string, any>[] => {
  const csvString = buffer.toString('utf8');
  const lines = csvString.split(/\r?\n/).filter((line) => line.trim() !== '');

  if (lines.length < 2) {
    throw new Error('CSV must have a header and at least one data row.');
  }

  const headers = lines[0].split(',').map((h) => h.trim());
  const jsonArray: Record<string, any>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(',').map((v) => v.trim());

    const obj: Record<string, any> = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] !== undefined ? values[index] : null;
    });

    jsonArray.push(obj); // ✅ This will now be valid
  }

  return jsonArray;
};
