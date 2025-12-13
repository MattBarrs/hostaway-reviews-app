export enum CategoryKey {
  CLEANLINESS = 'cleanliness',
  COMMUNICATION = 'communication',
  RESPECT_HOUSE_RULES = 'respect_house_rules',
}

export const categoryLabel = (key: string): string => {
  const map: Record<string, string> = {
    [CategoryKey.CLEANLINESS]: 'Cleanliness',
    [CategoryKey.COMMUNICATION]: 'Communication',
    [CategoryKey.RESPECT_HOUSE_RULES]: 'Respect House Rules',
  };

  return map[key] ?? key.replace(/_/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
};
