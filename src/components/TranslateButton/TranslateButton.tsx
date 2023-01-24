import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { IconButton, Menu, MenuItem } from "@mui/material";
import { Translate } from "@mui/icons-material";

// Styles
import classes from "./TranslateButton.module.scss";

const TranslateButton: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  };

  const handleIconButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <IconButton
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleIconButtonClick}
      >
        <Translate className={classes.icon} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            changeLanguage("en");
            handleClose();
          }}
          value="en"
        >
          en
        </MenuItem>
        <MenuItem
          onClick={() => {
            changeLanguage("ru");
            handleClose();
          }}
          value="ru"
        >
          ru
        </MenuItem>
      </Menu>
    </>
  );
};

export default TranslateButton;
