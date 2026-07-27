'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BMI_GAUGE_MAX,
  BMI_GAUGE_MIN,
  bmiGaugePercent,
  calculateBmi,
  feetInchesToCm,
  getBmiCategory,
  getBmiGaugeSegments,
  getHealthyWeightRangeKg,
  kgToLb,
  lbToKg,
} from '../lib/bmi';
import './bmi-calculator.css';

type Unit = 'metric' | 'imperial';
type Gender = '' | 'female' | 'male' | 'other';

const GAUGE_SEGMENTS = getBmiGaugeSegments();
const GENDER_LABELS: Record<Exclude<Gender, ''>, string> = {
  female: 'woman',
  male: 'man',
  other: 'person',
};
const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: '', label: 'Prefer not to say' },
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' },
];

export default function BmiCalculator() {
  const [unit, setUnit] = useState<Unit>('metric');

  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');

  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weightLb, setWeightLb] = useState('');

  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender>('');
  const [genderMenuOpen, setGenderMenuOpen] = useState(false);
  const genderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!genderMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (genderRef.current && !genderRef.current.contains(e.target as Node)) {
        setGenderMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [genderMenuOpen]);

  const result = useMemo(() => {
    let hCm: number;
    let wKg: number;

    if (unit === 'metric') {
      hCm = parseFloat(heightCm);
      wKg = parseFloat(weightKg);
    } else {
      const ft = parseFloat(feet) || 0;
      const inch = parseFloat(inches) || 0;
      hCm = feetInchesToCm(ft, inch);
      wKg = lbToKg(parseFloat(weightLb));
    }

    if (!hCm || !wKg || hCm <= 0 || wKg <= 0) return null;

    const bmi = calculateBmi(wKg, hCm);
    const { minKg, maxKg } = getHealthyWeightRangeKg(hCm);

    return {
      bmi,
      category: getBmiCategory(bmi),
      gaugePct: bmiGaugePercent(bmi),
      rangeMin: unit === 'metric' ? minKg : Math.round(kgToLb(minKg)),
      rangeMax: unit === 'metric' ? maxKg : Math.round(kgToLb(maxKg)),
    };
  }, [unit, heightCm, weightKg, feet, inches, weightLb]);

  const ageNum = parseFloat(age);
  const rangeUnitLabel = unit === 'metric' ? 'kg' : 'lb';

  return (
    <div className="bmi-calculator glass-panel">
      <div className="bmi-calculator__toggle">
        <button
          type="button"
          className={`bmi-calculator__toggle-btn ${unit === 'metric' ? 'active' : ''}`}
          onClick={() => setUnit('metric')}
        >
          Metric
        </button>
        <button
          type="button"
          className={`bmi-calculator__toggle-btn ${unit === 'imperial' ? 'active' : ''}`}
          onClick={() => setUnit('imperial')}
        >
          Imperial
        </button>
      </div>

      <div className="bmi-calculator__fields">
        {unit === 'metric' ? (
          <>
            <div className="bmi-calculator__field">
              <label htmlFor="bmi-height-cm">Height (cm)</label>
              <input
                id="bmi-height-cm"
                type="number"
                min="0"
                placeholder="175"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="bmi-calculator__input"
              />
            </div>
            <div className="bmi-calculator__field">
              <label htmlFor="bmi-weight-kg">Weight (kg)</label>
              <input
                id="bmi-weight-kg"
                type="number"
                min="0"
                placeholder="70"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="bmi-calculator__input"
              />
            </div>
          </>
        ) : (
          <>
            <div className="bmi-calculator__field bmi-calculator__field--split">
              <label>Height</label>
              <div className="bmi-calculator__split-inputs">
                <input
                  id="bmi-height-ft"
                  type="number"
                  min="0"
                  placeholder="ft"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value)}
                  className="bmi-calculator__input"
                />
                <input
                  id="bmi-height-in"
                  type="number"
                  min="0"
                  placeholder="in"
                  value={inches}
                  onChange={(e) => setInches(e.target.value)}
                  className="bmi-calculator__input"
                />
              </div>
            </div>
            <div className="bmi-calculator__field">
              <label htmlFor="bmi-weight-lb">Weight (lb)</label>
              <input
                id="bmi-weight-lb"
                type="number"
                min="0"
                placeholder="154"
                value={weightLb}
                onChange={(e) => setWeightLb(e.target.value)}
                className="bmi-calculator__input"
              />
            </div>
          </>
        )}
      </div>

      <div className="bmi-calculator__fields bmi-calculator__fields--secondary">
        <div className="bmi-calculator__field">
          <label htmlFor="bmi-age">Age (optional)</label>
          <input
            id="bmi-age"
            type="number"
            min="0"
            placeholder="30"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="bmi-calculator__input"
          />
        </div>
        <div className="bmi-calculator__field">
          <label id="bmi-gender-label">Gender (optional)</label>
          <div className="bmi-calculator__dropdown" ref={genderRef}>
            <button
              type="button"
              className="bmi-calculator__input bmi-calculator__dropdown-trigger"
              onClick={() => setGenderMenuOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={genderMenuOpen}
              aria-labelledby="bmi-gender-label"
            >
              {GENDER_OPTIONS.find((opt) => opt.value === gender)?.label}
              <span className="bmi-calculator__dropdown-chevron" />
            </button>
            {genderMenuOpen && (
              <ul className="bmi-calculator__dropdown-menu" role="listbox">
                {GENDER_OPTIONS.map((opt) => (
                  <li key={opt.value || 'none'}>
                    <button
                      type="button"
                      className={`bmi-calculator__dropdown-item ${gender === opt.value ? 'active' : ''}`}
                      role="option"
                      aria-selected={gender === opt.value}
                      onClick={() => {
                        setGender(opt.value);
                        setGenderMenuOpen(false);
                      }}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="bmi-calculator__result">
        {result ? (
          <>
            <div className="bmi-calculator__value text-gradient">{result.bmi}</div>
            <div className={`bmi-calculator__category ${result.category.className}`}>
              {result.category.label}
            </div>

            <div className="bmi-calculator__gauge">
              <div className="bmi-calculator__gauge-track">
                {GAUGE_SEGMENTS.map((seg) => (
                  <span
                    key={seg.className}
                    className={`bmi-calculator__gauge-seg ${seg.className}`}
                    style={{ width: `${seg.widthPct}%` }}
                  />
                ))}
                <div className="bmi-calculator__gauge-pointer" style={{ left: `${result.gaugePct}%` }} />
              </div>
              <div className="bmi-calculator__gauge-labels">
                <span>{BMI_GAUGE_MIN}</span>
                <span>{BMI_GAUGE_MAX}</span>
              </div>
            </div>

            <p className="bmi-calculator__range">
              Healthy weight range for your height
              {age && !Number.isNaN(ageNum) ? `, at age ${ageNum}` : ''}
              {gender ? ` (${GENDER_LABELS[gender]})` : ''}:{' '}
              <strong>{result.rangeMin}–{result.rangeMax} {rangeUnitLabel}</strong>
            </p>

            {age && !Number.isNaN(ageNum) && ageNum < 18 && (
              <p className="bmi-calculator__note">
                Standard adult BMI categories don&apos;t apply well under 18 — growth charts use age- and
                gender-specific percentiles instead.
              </p>
            )}
          </>
        ) : (
          <p className="bmi-calculator__prompt">Enter your height and weight to see your BMI.</p>
        )}
      </div>
    </div>
  );
}
