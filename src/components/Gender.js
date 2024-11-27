import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function GenderButton({ value, backgroundColor, onClick }) {
    return(
    <Button 
        onClick={onClick}
        className="button"
        sx={{ width:100
            ,color: "white"
            ,background: backgroundColor
            // ,backgroundColor:{backgroundColor}
            ,borderRadius: 28
            ,boxShadow: '0 2px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.02)'
            ,margin: "2px"

            ,transition: "transform .2s, box-shadow .2s",
                        '&:hover': {
                            // transform: "scale(1.02) perspective(0px)",
                            boxShadow: '0 0 0 10px rgba(145, 145, 145, 0.16)',
                          },
             
        }}
    >
            {value}
    </Button>
    );
};

export default function GenderButtons({ activeGender, onGenderClick }) {

    const [genderValue, setGenderValue] = useState(activeGender)
    
    const startingWomenButton = (genderValue === 1 || genderValue === 3) ? true:false
    const startingMenButton = (genderValue === 1 || genderValue === 2) ? true:false

    const [activeWomenButton, setActiveWomenButton] = useState(startingWomenButton);
    const [activeMenButton, setActiveMenButton] = useState(startingMenButton);

// Note 1
    useEffect(() => {
        if (activeWomenButton && activeMenButton) {
            setGenderValue(1)
        }
        else if (activeWomenButton && !activeMenButton) {
            setGenderValue(3)
        }
        else if (!activeWomenButton && activeMenButton) {
            setGenderValue(2)
        }
        else if (!activeWomenButton && !activeMenButton) { setGenderValue(0)
        }
        onGenderClick(genderValue)

    },[handleClick])

    function handleClick(event) {
        if (event.target.innerText === "WOMEN") {
            setActiveWomenButton(activeWomenButton ? false : true)
        }
        else if (event.target.innerText === "MEN") {
            setActiveMenButton(activeMenButton ? false : true)
        }
    }

    return (
      <div className="buttons">
        <GenderButton
            onClick={handleClick} 
            value="Women"
            backgroundColor={activeWomenButton ? "linear-gradient(.100turn, #ff4076, #ff9b69)" : "linear-gradient(.100turn, #212121, #808080)"}
        />
        <GenderButton 
            onClick={handleClick} 
            value="Men" 
            backgroundColor={activeMenButton ? "linear-gradient(.100turn, #005eff, #3dbce3)" : "linear-gradient(.100turn, #212121, #808080)"}
        />
      </div>
    );
  }

  

// Note 1
//Every single time the handleClick function fires, the genderValue is calculated using the states of the activeWomenButton and activeMenButton state objects, and then sends this updated genderValue through the onGenderClick prop to the parent component. 
//The reason that the useEffect() function is necessary is because originally, I had the setGenderValue and onGenderClick in the handleClick() function, but there was an issue with the genderValue being set before the activeWomenButton or activeMenButton switched from true to false. For example, lets say both the men and women buttons havent been clicked yet (both states are true). Once either of them are clicked, the setGenderValue function would fire and would evaluate that both the men and women buttons are still true, and then it would send the genderValue through the prop to the parent component, THEN, the men or women button would toggle to false, but at that point, it was too late because the genderValue sent reflected the state of the two gender buttons before either of them were clicked. 