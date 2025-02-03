export const validateDateRange = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return true;
    return new Date(endDate) >= new Date(startDate) || "Data końcowa nie może być wcześniejsza niż początkowa";
  };