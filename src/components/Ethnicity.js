import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function CheckBoxChild({ ethnicity, onClick, label, color }){
    return (
        <FormControlLabel
    control={
        <Checkbox
            id={ethnicity.ethnicity}
            checked={ethnicity.selected}
            onChange={(event) => {
                onClick({
                        ...ethnicity,
                        selected: event.target.checked,
                    });
                }}
            sx={{
                padding: "0px 0 0 0"
                // transition: "box-shadow .2s"
                // ,'&:hover': {
                //         boxShadow: '0 0 0 10px rgba(145, 145, 145, 0.16)',
                //     },
                // '&:before': {
                //         boxShadow:
                //         '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
                //     }
                ,"& .MuiSvgIcon-root": { 
                        fontSize: 28,
                        color: {color},
                    }
        
                // ,backgroundColor: "transparent"
                // ,"&.MuiButtonBase-root": {
                //     disableRipple: false
                // }
                // ,"&.MuiCheckbox-root": {
                // }
            }}
        />}
        sx={{
            padding: "12px 0 0 0",
        "& .MuiTypography-root": {
            lineHeight: "1.3"
          }
        }}
    label={label}
    >
    </FormControlLabel>
    )
}


function CheckBoxParent({ group, onClick, label, color, children, onClickChild }){
return (
    <div className="checkBoxParent">
    <FormControlLabel sx={{
                "& .MuiTypography-root": {
                    fontWeight: "550"
                    }}}
        control={
            <Checkbox
                id={group.ethnicity_group}
                checked={group.selected}
                indeterminate={group.indeterminate}
                onChange={(event) => {
                    onClick({
                            ethnicity_group: group.ethnicity_group,
                            color: group.color,
                            selected: event.target.checked,
                        });
                    }}
                sx={{
                    padding: "2px"
                    ,fontWeight: "bold"
                    // ,transition: "box-shadow .2s",
                    //     '&:hover': {
                    //         boxShadow: '0 0 0 10px rgba(145, 145, 145, 0.16)',
                    //       },
                    //       '&:before': {
                    //         boxShadow:
                    //           '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
                    //       }
                    ,"& .MuiSvgIcon-root": { 
                            fontSize: 28,
                            color: {color},
                        }
                    // ,backgroundColor: "transparent"
                    // ,"&.MuiButtonBase-root": {
                    //     disableRipple: false
                    // }
                    ,"& .MuiTypography-root": {
                    padding: "20px"
                    ,fontWeight: "bold"
                    }
                }}
            />}
         label={label}
    >
     </FormControlLabel>

     <div className="checkBoxChild">
            {children.map((child) => (
            <CheckBoxChild 
                key={child.ethnicity} 
                ethnicity={child} 
                // ethnicity_group={child.ethnicity_group}
                label={child.ethnicity} 
                color={child.color} 
                onClick={onClickChild}
            />
        ))}
        </div>
     </div>


    )
}

function ResetBox({ select, onClick }){
    return(
        <div className="openToAllBox">
        <FormControlLabel
            control=
            {<Checkbox
                id="open_to_all"
                checked={select}
                // {...select === "indeterminate" && {indeterminate:true}}
                onChange={(event) => {
                    onClick("ethnicity", event.target.checked);
                    }}
                    sx={{
                        padding: "2px"
                        ,"& .MuiSvgIcon-root": { 
                                fontSize: 28,
                                color: "#D8D8D8",
                            }
                        // ,backgroundColor: "transparent"
                        // ,"&.MuiButtonBase-root": {
                        //     disableRipple: false
                        // }
                        // ,"&.MuiCheckbox-root": {
                        // }
                    }}
            ></Checkbox>}
            label="Open to All"
            >
                </FormControlLabel>
                </div>
    )
}

export default function Ethnicity( { activeEthnicity, onEthnicityClick, activeEthnicityGroup, onEthnicityGroupClick, activeEthnicityAll, resetter } ) {
    // Prepare data by organizing ethnicities into respective groups and inserting those nested objects into an array.
    const organizedEthnicity = []
    const ethnicityOrganizer = activeEthnicityGroup.map((group) => {
        const ethnicityChildren = []
        activeEthnicity.map((ethnicity) => {
            if(ethnicity.ethnicity_group === group.ethnicity_group) {
                ethnicityChildren.push(ethnicity)
            }
        })
        organizedEthnicity.push({...group, "children": ethnicityChildren})
    }
    );
    // First we loop through each ethnicity group and provide both ethnicity group props and the ethnicity children props.
    return (
        <div className="checkBoxContainerParent"> 
        <div className="ethnicityHeader">
            <ResetBox key="open_to_all" select={activeEthnicityAll} onClick={resetter}/>
            <div className="scrollHUD">
                <p style={{color:"#cccccc", fontSize:"16px",fontWeight:"500"}}>Scroll</p>
            <ArrowForwardIcon sx={{color:"#cccccc"}}/>
            {/* <NavigateNextIcon sx={{color:"#D8D8D8", margin:"0 -5px 0 0"}}/>
            <NavigateNextIcon sx={{color:"#D8D8D8", margin:"0 -5px 0 0"}}/> */}
            </div>

        </div>
        <div className="checkBoxContainer">
            {organizedEthnicity.map((group) => (
            <CheckBoxParent 
                key={group.ethnicity_group} 
                group={group} 
                label={group.ethnicity_group} 
                color={group.color} 
                onClick={onEthnicityGroupClick}

                children={group.children}
                onClickChild={onEthnicityClick}
            />
        ))}
        </div>
        </div>
  );
}