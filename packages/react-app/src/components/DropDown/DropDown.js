import { DropDownContainer, DropDownHeader, DropDownListContainer, DropDownList, ListItem } from "./DropDownStyles";

export const DropDown = (({ options, onOptionClicked, selectedOption, isOpen, toggling }) => {
  return (
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map(option => (
                <ListItem onClick={onOptionClicked(option)} key={option}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
  );
});
