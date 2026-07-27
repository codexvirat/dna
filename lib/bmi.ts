export function calculateBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function lbToKg(lb: number): number {
  return lb * 0.45359237;
}

export function kgToLb(kg: number): number {
  return kg / 0.45359237;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return (feet * 12 + inches) * 2.54;
}

export interface BmiCategory {
  label: string;
  className: string;
}

export function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return { label: 'Underweight', className: 'bmi-underweight' };
  if (bmi < 25) return { label: 'Normal', className: 'bmi-normal' };
  if (bmi < 30) return { label: 'Overweight', className: 'bmi-overweight' };
  return { label: 'Obese', className: 'bmi-obese' };
}

export function getHealthyWeightRangeKg(heightCm: number): { minKg: number; maxKg: number } {
  const heightM = heightCm / 100;
  return {
    minKg: Math.round(18.5 * heightM * heightM * 10) / 10,
    maxKg: Math.round(24.9 * heightM * heightM * 10) / 10,
  };
}

export const BMI_GAUGE_MIN = 15;
export const BMI_GAUGE_MAX = 40;

const BMI_GAUGE_BOUNDS = [BMI_GAUGE_MIN, 18.5, 25, 30, BMI_GAUGE_MAX];
const BMI_GAUGE_CLASSES = ['bmi-underweight', 'bmi-normal', 'bmi-overweight', 'bmi-obese'];

export function getBmiGaugeSegments(): { className: string; widthPct: number }[] {
  const total = BMI_GAUGE_MAX - BMI_GAUGE_MIN;
  return BMI_GAUGE_CLASSES.map((className, i) => ({
    className,
    widthPct: ((BMI_GAUGE_BOUNDS[i + 1] - BMI_GAUGE_BOUNDS[i]) / total) * 100,
  }));
}

export function bmiGaugePercent(bmi: number): number {
  const clamped = Math.min(Math.max(bmi, BMI_GAUGE_MIN), BMI_GAUGE_MAX);
  return ((clamped - BMI_GAUGE_MIN) / (BMI_GAUGE_MAX - BMI_GAUGE_MIN)) * 100;
}
