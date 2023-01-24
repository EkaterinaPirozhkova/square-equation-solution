import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

// Components
import ResultsTable from "./components/ResultsTable";
import TranslateButton from "./components/TranslateButton";

// Styles
import classes from "./SquareEquationApp.module.scss";

const SquareEquationApp: FC = () => {
  const [coefficientA, setCoefficientA] = useState<number | null>(null);
  const [coefficientB, setCoefficientB] = useState<number | null>(null);
  const [coefficientC, setCoefficientC] = useState<number | null>(null);
  const [isButtonClick, setIsButtonClick] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);

  const { t } = useTranslation();

  const coefficientsAreEmpty =
    coefficientA == null || coefficientB == null || coefficientC == null;

  const calcDiscriminant = () => {
    if (coefficientsAreEmpty) {
      return;
    }

    const discriminant =
      Math.pow(coefficientB, 2) - 4 * coefficientA * coefficientC;
    if (discriminant >= 0) {
      calcRoots(discriminant);
    } else {
      setResults([]);
    }
  };

  const calcRoots = (discriminant: number) => {
    if (coefficientsAreEmpty) {
      return;
    }

    if (discriminant > 0) {
      const x1 = (-coefficientB + Math.sqrt(discriminant)) / (2 * coefficientA);
      const x2 = (-coefficientB - Math.sqrt(discriminant)) / (2 * coefficientA);
      setResults([x1, x2]);
    } else {
      const x = -coefficientB / (2 * coefficientA);
      setResults([x]);
    }
  };

  const handleButtonClick = useCallback(() => {
    setIsButtonClick(true);
  }, []);

  const changeCoefficientA = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setCoefficientA(null);
    } else {
      setCoefficientA(+e.target.value);
    }
    setIsButtonClick(false);
  }, []);

  const changeCoefficientB = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setCoefficientB(null);
    } else {
      setCoefficientB(+e.target.value);
    }
    setIsButtonClick(false);
  }, []);

  const changeCoefficientC = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setCoefficientC(null);
    } else {
      setCoefficientC(+e.target.value);
    }
    setIsButtonClick(false);
  }, []);

  useEffect(() => {
    if (!coefficientsAreEmpty) {
      calcDiscriminant();
    }
  }, [isButtonClick]);

  return (
    <div className={classes.app}>
      <div className={classes.translateIcon}>
        <TranslateButton />
      </div>
      <div className={classes.title}>{t("title")}</div>
      <div className={classes.subtitle}>{t("subtitle")}</div>
      <div className={classes.equationContainer}>
        <div className={classes.equation}>
          <input
            type="number"
            onChange={changeCoefficientA}
            className={classes.input}
          />
          x
          <sup>
            <small>2</small>
          </sup>
          +
          <input
            type="number"
            onChange={changeCoefficientB}
            className={classes.input}
          />
          x +
          <input
            type="number"
            onChange={changeCoefficientC}
            className={classes.input}
          />
          = 0
        </div>
        <button onClick={handleButtonClick} className={classes.button}>
          {t("buttonLabel")}
        </button>
      </div>
      {isButtonClick && coefficientsAreEmpty ? (
        <div className={classes.warning}>{t("warningNotAllCoefficients")}</div>
      ) : null}
      {coefficientA == 0 ? (
        <div className={classes.warning}>{t("warningIncorrectValue")}</div>
      ) : null}
      <div>
        {isButtonClick &&
        results &&
        !coefficientsAreEmpty &&
        coefficientA != 0 ? (
          <ResultsTable
            results={results}
            coefficientA={coefficientA}
            coefficientB={coefficientB}
            coefficientC={coefficientC}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SquareEquationApp;
