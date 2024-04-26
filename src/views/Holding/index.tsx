import { SafeAreaView } from 'react-native'
import React from 'react'
import { UserStockInterface } from '../../types';
import { Style } from './style';
import { Header, Loader, Error, HoldingList, HoldingSummary } from '../../components';
import { API_URL } from '../../constants';
import useFetchAPI from '../../utils/hooks/useFetchAPI';

const Holding = () => {

    const { data, error, isLoading } = useFetchAPI<UserStockInterface>(API_URL);

    if (isLoading) {
        return <Loader />;
    }

    if (error || !data) {
        return <Error />;
    }

    // Handle successful data retrieval using `data`
    const userHolding = data.userHolding;

    return (
        <SafeAreaView style={Style.container}>

            {/* Header View */}
            <Header />

            {/* Listing and Summary View */}
            <>
                {/* List of Stock Holdings */}
                <HoldingList data={userHolding} />

                {/* Footer with Summary Expander */}
                <HoldingSummary data={userHolding} />
            </>
        </SafeAreaView>
    )
}

export default Holding
