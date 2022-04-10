import { DropDownContainer, DropDownHeader, DropDownListContainer, DropDownList, ListItem, Caret, OverCaret } from "./DropDownStyles";
import { Centered } from "../Styles";

export const DropDown = (({ options, onOptionClicked, selectedOption, isOpen, toggling }) => {
  return (
      <DropDownContainer>
        <Centered>GAME TOKEN</Centered>
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
