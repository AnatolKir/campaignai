import { TimezoneOption, TimezoneRegion } from '../types/create-post';

/**
 * Comprehensive list of world timezones organized by region
 */
export const TIMEZONE_REGIONS: TimezoneRegion[] = [
  {
    name: "North America",
    timezones: [
      { value: 'America/New_York', label: 'Eastern Time (ET)', offset: 'UTC-5/-4', region: 'North America', city: 'New York', country: 'United States', isDST: true },
      { value: 'America/Chicago', label: 'Central Time (CT)', offset: 'UTC-6/-5', region: 'North America', city: 'Chicago', country: 'United States', isDST: true },
      { value: 'America/Denver', label: 'Mountain Time (MT)', offset: 'UTC-7/-6', region: 'North America', city: 'Denver', country: 'United States', isDST: true },
      { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: 'UTC-8/-7', region: 'North America', city: 'Los Angeles', country: 'United States', isDST: true },
      { value: 'America/Anchorage', label: 'Alaska Time (AKT)', offset: 'UTC-9/-8', region: 'North America', city: 'Anchorage', country: 'United States', isDST: true },
      { value: 'Pacific/Honolulu', label: 'Hawaii Time (HST)', offset: 'UTC-10', region: 'North America', city: 'Honolulu', country: 'United States', isDST: false },
      { value: 'America/Toronto', label: 'Eastern Time - Canada', offset: 'UTC-5/-4', region: 'North America', city: 'Toronto', country: 'Canada', isDST: true },
      { value: 'America/Vancouver', label: 'Pacific Time - Canada', offset: 'UTC-8/-7', region: 'North America', city: 'Vancouver', country: 'Canada', isDST: true },
      { value: 'America/Mexico_City', label: 'Central Time - Mexico', offset: 'UTC-6/-5', region: 'North America', city: 'Mexico City', country: 'Mexico', isDST: true },
    ]
  },
  {
    name: "Europe",
    timezones: [
      { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', offset: 'UTC+0/+1', region: 'Europe', city: 'London', country: 'United Kingdom', isDST: true },
      { value: 'Europe/Paris', label: 'Central European Time (CET)', offset: 'UTC+1/+2', region: 'Europe', city: 'Paris', country: 'France', isDST: true },
      { value: 'Europe/Berlin', label: 'Central European Time (CET)', offset: 'UTC+1/+2', region: 'Europe', city: 'Berlin', country: 'Germany', isDST: true },
      { value: 'Europe/Rome', label: 'Central European Time (CET)', offset: 'UTC+1/+2', region: 'Europe', city: 'Rome', country: 'Italy', isDST: true },
      { value: 'Europe/Madrid', label: 'Central European Time (CET)', offset: 'UTC+1/+2', region: 'Europe', city: 'Madrid', country: 'Spain', isDST: true },
      { value: 'Europe/Amsterdam', label: 'Central European Time (CET)', offset: 'UTC+1/+2', region: 'Europe', city: 'Amsterdam', country: 'Netherlands', isDST: true },
      { value: 'Europe/Stockholm', label: 'Central European Time (CET)', offset: 'UTC+1/+2', region: 'Europe', city: 'Stockholm', country: 'Sweden', isDST: true },
      { value: 'Europe/Athens', label: 'Eastern European Time (EET)', offset: 'UTC+2/+3', region: 'Europe', city: 'Athens', country: 'Greece', isDST: true },
      { value: 'Europe/Helsinki', label: 'Eastern European Time (EET)', offset: 'UTC+2/+3', region: 'Europe', city: 'Helsinki', country: 'Finland', isDST: true },
      { value: 'Europe/Moscow', label: 'Moscow Standard Time (MSK)', offset: 'UTC+3', region: 'Europe', city: 'Moscow', country: 'Russia', isDST: false },
      { value: 'Europe/Istanbul', label: 'Turkey Time (TRT)', offset: 'UTC+3', region: 'Europe', city: 'Istanbul', country: 'Turkey', isDST: false },
    ]
  },
  {
    name: "Asia Pacific",
    timezones: [
      { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', offset: 'UTC+9', region: 'Asia Pacific', city: 'Tokyo', country: 'Japan', isDST: false },
      { value: 'Asia/Seoul', label: 'Korea Standard Time (KST)', offset: 'UTC+9', region: 'Asia Pacific', city: 'Seoul', country: 'South Korea', isDST: false },
      { value: 'Asia/Shanghai', label: 'China Standard Time (CST)', offset: 'UTC+8', region: 'Asia Pacific', city: 'Shanghai', country: 'China', isDST: false },
      { value: 'Asia/Hong_Kong', label: 'Hong Kong Time (HKT)', offset: 'UTC+8', region: 'Asia Pacific', city: 'Hong Kong', country: 'Hong Kong', isDST: false },
      { value: 'Asia/Singapore', label: 'Singapore Standard Time (SGT)', offset: 'UTC+8', region: 'Asia Pacific', city: 'Singapore', country: 'Singapore', isDST: false },
      { value: 'Asia/Bangkok', label: 'Indochina Time (ICT)', offset: 'UTC+7', region: 'Asia Pacific', city: 'Bangkok', country: 'Thailand', isDST: false },
      { value: 'Asia/Jakarta', label: 'Western Indonesia Time (WIB)', offset: 'UTC+7', region: 'Asia Pacific', city: 'Jakarta', country: 'Indonesia', isDST: false },
      { value: 'Asia/Manila', label: 'Philippine Standard Time (PST)', offset: 'UTC+8', region: 'Asia Pacific', city: 'Manila', country: 'Philippines', isDST: false },
      { value: 'Asia/Kolkata', label: 'India Standard Time (IST)', offset: 'UTC+5:30', region: 'Asia Pacific', city: 'Mumbai', country: 'India', isDST: false },
      { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)', offset: 'UTC+4', region: 'Asia Pacific', city: 'Dubai', country: 'UAE', isDST: false },
      { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)', offset: 'UTC+10/+11', region: 'Asia Pacific', city: 'Sydney', country: 'Australia', isDST: true },
      { value: 'Australia/Melbourne', label: 'Australian Eastern Time (AET)', offset: 'UTC+10/+11', region: 'Asia Pacific', city: 'Melbourne', country: 'Australia', isDST: true },
      { value: 'Australia/Perth', label: 'Australian Western Time (AWT)', offset: 'UTC+8', region: 'Asia Pacific', city: 'Perth', country: 'Australia', isDST: false },
      { value: 'Pacific/Auckland', label: 'New Zealand Time (NZDT)', offset: 'UTC+12/+13', region: 'Asia Pacific', city: 'Auckland', country: 'New Zealand', isDST: true },
    ]
  },
  {
    name: "South America",
    timezones: [
      { value: 'America/Sao_Paulo', label: 'Brasília Time (BRT)', offset: 'UTC-3/-2', region: 'South America', city: 'São Paulo', country: 'Brazil', isDST: true },
      { value: 'America/Argentina/Buenos_Aires', label: 'Argentina Time (ART)', offset: 'UTC-3', region: 'South America', city: 'Buenos Aires', country: 'Argentina', isDST: false },
      { value: 'America/Santiago', label: 'Chile Time (CLT)', offset: 'UTC-4/-3', region: 'South America', city: 'Santiago', country: 'Chile', isDST: true },
      { value: 'America/Lima', label: 'Peru Time (PET)', offset: 'UTC-5', region: 'South America', city: 'Lima', country: 'Peru', isDST: false },
      { value: 'America/Bogota', label: 'Colombia Time (COT)', offset: 'UTC-5', region: 'South America', city: 'Bogotá', country: 'Colombia', isDST: false },
      { value: 'America/Caracas', label: 'Venezuela Time (VET)', offset: 'UTC-4', region: 'South America', city: 'Caracas', country: 'Venezuela', isDST: false },
    ]
  },
  {
    name: "Africa & Middle East",
    timezones: [
      { value: 'Africa/Cairo', label: 'Eastern European Time (EET)', offset: 'UTC+2', region: 'Africa & Middle East', city: 'Cairo', country: 'Egypt', isDST: false },
      { value: 'Africa/Lagos', label: 'West Africa Time (WAT)', offset: 'UTC+1', region: 'Africa & Middle East', city: 'Lagos', country: 'Nigeria', isDST: false },
      { value: 'Africa/Johannesburg', label: 'South Africa Time (SAST)', offset: 'UTC+2', region: 'Africa & Middle East', city: 'Johannesburg', country: 'South Africa', isDST: false },
      { value: 'Africa/Nairobi', label: 'East Africa Time (EAT)', offset: 'UTC+3', region: 'Africa & Middle East', city: 'Nairobi', country: 'Kenya', isDST: false },
      { value: 'Asia/Riyadh', label: 'Arabia Standard Time (AST)', offset: 'UTC+3', region: 'Africa & Middle East', city: 'Riyadh', country: 'Saudi Arabia', isDST: false },
      { value: 'Asia/Jerusalem', label: 'Israel Standard Time (IST)', offset: 'UTC+2/+3', region: 'Africa & Middle East', city: 'Jerusalem', country: 'Israel', isDST: true },
    ]
  }
];

/**
 * Flattened list of all timezones for backward compatibility
 */
export const ALL_TIMEZONES: TimezoneOption[] = TIMEZONE_REGIONS.flatMap(region => region.timezones);

/**
 * Get current offset for a timezone (accounting for DST)
 */
export function getCurrentOffset(timezone: string): string {
  try {
    const now = new Date();
    const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const targetTime = new Date(utc.toLocaleString("en-US", { timeZone: timezone }));
    const offsetMinutes = (targetTime.getTime() - utc.getTime()) / (1000 * 60);
    const offsetHours = offsetMinutes / 60;
    
    const sign = offsetHours >= 0 ? '+' : '-';
    const absHours = Math.abs(offsetHours);
    const hours = Math.floor(absHours);
    const minutes = Math.round((absHours - hours) * 60);
    
    return `UTC${sign}${hours.toString().padStart(2, '0')}${minutes > 0 ? ':' + minutes.toString().padStart(2, '0') : ''}`;
  } catch (error) {
    // Fallback to static offset
    const timezone_data = ALL_TIMEZONES.find(tz => tz.value === timezone);
    return timezone_data?.offset || 'UTC+0';
  }
}

/**
 * Get timezone by value
 */
export function getTimezoneInfo(timezoneValue: string): TimezoneOption | undefined {
  return ALL_TIMEZONES.find(tz => tz.value === timezoneValue);
}

/**
 * Get popular/recommended timezones for quick selection
 */
export const POPULAR_TIMEZONES: TimezoneOption[] = [
  ALL_TIMEZONES.find(tz => tz.value === 'America/New_York')!,
  ALL_TIMEZONES.find(tz => tz.value === 'America/Los_Angeles')!,
  ALL_TIMEZONES.find(tz => tz.value === 'Europe/London')!,
  ALL_TIMEZONES.find(tz => tz.value === 'Europe/Paris')!,
  ALL_TIMEZONES.find(tz => tz.value === 'Asia/Tokyo')!,
  ALL_TIMEZONES.find(tz => tz.value === 'Australia/Sydney')!,
  ALL_TIMEZONES.find(tz => tz.value === 'Asia/Shanghai')!,
  ALL_TIMEZONES.find(tz => tz.value === 'Asia/Kolkata')!,
]; 