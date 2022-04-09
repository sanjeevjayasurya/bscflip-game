import { useState, useEffect } from "react";

import { DropDownContainer, DropDownHeader, DropDownListContainer, DropDownList, ListItem, Caret, OverCaret } from "./DropDownStyles";
import { Image } from "../Styles";

import bscfLogo from "../../img/bscflogo.png";
import bnbLogo from "../../img/bnblogo.png";

export const DropDown = (({ options, onOptionClicked, selectedOption, isOpen, toggling }) => {
  const [logo, setLogo] = useState(bscfLogo);

  useEffect(() => {
    console.log(selectedOption);
    if (selectedOption === "BSCF") {
      setLogo(bscfLogo);
    }
    if (selectedOption === "BNB") {
      setLogo(bnbLogo);
    }
  }, [selectedOption]);

  return (
      <DropDownContainer>
        <Image src={logo} alt="bscflip-logo" />
        <DropDownHeader onClick={toggling}>
          {selectedOption}
          <Caret isOpen={isOpen}>
            <OverCaret isOpen={isOpen} />
          </Caret>
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={option}>
                  {option}
                </ListItem>
              ))
        }
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
  );
});
