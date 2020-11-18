import { Alert } from 'react-native';
import { ActionSheet } from 'native-base';
import reactotron from '../../../dev/ReactotronConfig';

interface IOptionProps{
    actions?:IDropdownActions;
    onSelect?:(number) => void
}
interface IDropdownActions{
    options: Array<string>;
    destructiveButtonIndex: number;
    cancelButtonIndex: number;
    title?:string;
}

const defaultActions = {
    options: ["do something","cancel","delete"],
    destructiveButtonIndex:2,
    cancelButtonIndex:1,
}
const defaultAction = (buttonIndex) => {
    Alert.alert(`${buttonIndex} button pressed`);
} 

const Options = (actions:IDropdownActions=defaultActions,onSelect:(number)=>void = defaultAction) => {
    reactotron.log!("In the options atom", actions);
    return ActionSheet.show(actions,onSelect);
}

export default Options
