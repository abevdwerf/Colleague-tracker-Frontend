import { IonChip, IonIcon } from "@ionic/react";
import { checkmarkSharp } from "ionicons/icons";

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const Filter = ({
  title,
  isActive,
  onClick,
  }: {
    title: string;
    isActive: boolean;
    onClick: React.MouseEventHandler;
  }) => {
  return (
    <IonChip onClick={onClick} style={{ backgroundColor: `${isActive ? "#4E54C5" : "white"}`, color: `${isActive ? "white" : "black"}` }} className="filterbtn" >
      {capitalize(title)}
      {isActive 
        ? <IonIcon id="checkicon" color="white" size='medium' icon={checkmarkSharp}>
          </IonIcon>
        : null
      }
      
    </IonChip>
  );
};

export default Filter;