import { useEffect, useState } from "react";
import { Basket } from "../../App/models/basket";
import agent from "../../App/api/agent";
import LoadingComponent from "../../App/layout/LoadingComponent";
import { Typography } from "@mui/material";

export default function BasketPage() {
    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        agent.Basket.get()
                    .then(basket => setBasket(basket))
                    .catch(error => console.log(error))
                    .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent message="Loading basket..."></LoadingComponent>
    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
            <h1>Buyer Id = {basket.buyerId}</h1>
    )
}
