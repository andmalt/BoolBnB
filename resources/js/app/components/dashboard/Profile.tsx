import React, { useEffect } from 'react'


interface ProfileProps {

}

const Profile = (props: ProfileProps) => {
    const { } = props;


    useEffect(() => {
        let isMount = true;
        if (isMount) {
            // function that checks if the user has verified the email
            // if the user is verified he will be taken to the messages page
        }
        return () => {
            isMount = false;
        }
    }, [])


    return (
        <div className='text-white'>Profile</div>
    )
}

export default Profile;