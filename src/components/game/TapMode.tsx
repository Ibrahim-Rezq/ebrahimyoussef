import type { Figure } from '../../data/figures';

interface TapModeProps {
  target: Figure;
  options: Figure[];
  onAnswer: (correct: boolean) => void;
}

export default function TapMode({ target, options, onAnswer }: TapModeProps) {
  return (
    <div className="tap-mode">
      <p className="game-hint">{target.hintEn}</p>
      <div className="tap-options" role="group" aria-label="Choose the figure">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="tap-option"
            onClick={() => onAnswer(option.id === target.id)}
          >
            <span className="tap-option-ar" dir="rtl" lang="ar">
              {option.nameAr}
            </span>
            <span className="tap-option-en">{option.nameEn}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
