import { SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StockHoldingInterface, UserStockInterface } from '../../types';
import { Style } from './style';
import { Header, Loader, Error, HoldingList, HoldingSummary } from '../../components';
import { API_URL } from '../../constants';

const Holding = () => {

    // States to manage stock holding data, screen state and summary view
    const [data, setData] = useState<StockHoldingInterface[]>([]);
    const [screen, setScreen] = useState<'loader' | 'error' | 'listing'>('loader');

    // Effect hook to fetch stock holding data on component mount
    useEffect(() => {
        fetch(API_URL)
            .then(resp => {
                if (resp.status !== 200) {
                    setScreen('error');
                    return;
                }
                resp.json()
                    .then((data: UserStockInterface) => {
                        setData(data.userHolding);
                        setScreen('listing');
                    })
                    .catch(err => {
                        setScreen('error');
                    });
            })
            .catch(() => {
                setScreen('error');
            })
    }, []);

    return (
        <SafeAreaView style={Style.container}>

            {/* Header View */}
            <Header />

            {/* Loader View */}
            {screen === "loader" && <Loader />}

            {/* Error View */}
            {screen === "error" && <Error />}

            {/* Listing and Summary View */}
            {screen === "listing" && (
                <>
                    {/* List of Stock Holdings */}
                    <HoldingList data={data} />

                    {/* Footer with Summary Expander */}
                    <HoldingSummary data={data} />
                </>
            )}
        </SafeAreaView>
    )
}

export default Holding
