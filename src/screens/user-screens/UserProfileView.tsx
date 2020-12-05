import { Container } from 'native-base';
import React from 'react'
import { UserDetailsPreview } from '../../components/molecules';
import { Confirmation } from '../../components/organisms';
import UserActivityNavigator from '../../navigations/UserActivityNavigator';
import { IUser } from 'node-rest-objects/dist/data/user-management';

interface IUserProfileViewProps{
    userData:IUser;
    userId?:string;
    isSelf:boolean;
    onEdit?:Function;
    isVerified:boolean;
    signOut?:any;
    openChat?:any;
}

const UserProfileView = ({userData,userId,isSelf,onEdit,isVerified, signOut=()=>{}, openChat=()=>{}}:IUserProfileViewProps) => {
    return (
        <>
            <UserDetailsPreview 
                user={userData} 
                onEdit={onEdit} 
                isSelf={isSelf} 
                isVerified={isVerified}
                signOut={signOut}
                openChat={openChat}    
            />
            {
                isSelf && !isVerified && <Confirmation/>
            }
            <UserActivityNavigator user={userData} />
        </>
    )
}

export default UserProfileView