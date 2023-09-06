import React from "react";
import Prayers from "./Prayers";

function PrayerContainer({prayers}) {

    console.log("Prayers:", prayers)

    const requests = prayers ? prayers.map((pObj) => {
        return <Prayers
                    key = {pObj.id}
                    description = {pObj.description}
                />
    }) : null

    console.log('Prayers:', prayers)

    return(
        <div>
            {requests}
        </div>
    )
}

export default PrayerContainer