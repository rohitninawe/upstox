import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

// Interfaces to type the stock holding data structure
interface UserStockInterface {
  userHolding: StockHoldingInterface[]
}
interface StockHoldingInterface {
  symbol: string,
  quantity: number,
  ltp: number,
  avgPrice: number,
  close: number
}

const App = () => {

  // State for managing the data array of stock holdings
  const [data, setData] = useState<StockHoldingInterface[]>([]);
  // State to manage the current screen view - loader, error or listing
  const [screen, setScreen] = useState<'loader' | 'error' | 'listing'>('loader');
  // State to show or hide summary details
  const [summary, showSummary] = useState(false);

  // Effect hook to fetch stock holding data on component mount
  useEffect(() => {
    fetch('https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8')
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

  }, [])

  // Callback for rendering each stock holding item in the list
  const _renderList = useCallback(({ item }: { item: StockHoldingInterface }) => {
    return (
      <View style={Styles.listItem}>

        {/* Stock Symbol and Quantity View */}
        <View>
          <Text style={Styles.title}>{item.symbol}</Text>
          <Text>{item.quantity}</Text>
        </View>

        {/* LTP and Profit/Loss View */}
        <View>
          <View style={Styles.flexRow}>
            <Text>LTP: </Text>
            <Text style={Styles.liveAmount}>₹ {item.ltp.toFixed(2)}</Text>
          </View>
          <View style={Styles.flexRow}>
            <Text>P/L: </Text>
            <Text style={Styles.liveAmount}>₹ {_getProfitLoss(item).toFixed(2)}</Text>
          </View>
        </View>

      </View>
    )
  }, []);


  // Helper functions for profit/loss calculations

  function _getCurrentValue(item: StockHoldingInterface) {
    return parseFloat((item.ltp * item.quantity).toFixed(2));
  }

  function _getInvestmentValue(item: StockHoldingInterface) {
    return item.avgPrice * item.quantity;
  }

  function _getProfitLoss(item: StockHoldingInterface) {
    return _getCurrentValue(item) - _getInvestmentValue(item);
  }

  function _getTotalCurrentValue() {
    return data.reduce((acc, item) => acc + _getCurrentValue(item), 0);
  }

  function _getTotalInvestmentValue() {
    return data.reduce((acc, item) => acc + _getInvestmentValue(item), 0);
  }

  function _getTotalProfitLoss() {
    return _getTotalCurrentValue() - _getTotalInvestmentValue();
  }

  function _getTodaysProfitLoss() {
    return data.reduce((acc, item) => acc + (item.close - item.ltp) * item.quantity, 0);
  }

  return (
    <SafeAreaView style={Styles.container}>

      {/* Header View */}
      <View style={Styles.header}>
        <Text style={Styles.headerFont}>Upstox Holding</Text>
      </View>

      {/* Loader View */}
      {screen === "loader" && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          size="large"
          color="#7d017d"
        />
      )}

      {/* Error View */}
      {screen === "error" && (
        <View style={Styles.errorWrapper}>
          <Text style={Styles.errorText}>Something went wrong. Please try again later.</Text>
        </View>
      )}

      {/* Listing and Summary View */}
      {screen === "listing" && (
        <>
          {/* List of Stock Holdings */}
          <FlatList
            data={data}
            renderItem={_renderList}
            style={{ flex: 1, backgroundColor: "#c3c3c8" }}
            contentContainerStyle={{ paddingLeft: 20, backgroundColor: "#fff" }}
          />

          {/* Footer with Summary Expander */}
          <TouchableOpacity
            onPress={() => showSummary(!summary)}
            activeOpacity={1}
            style={Styles.footer}>
            <Text style={[Styles.expander, {
              transform: [{ rotate: summary ? '0deg' : '180deg' }]
            }]}>▼</Text>

            {/* Summary Details */}
            {summary && (
              <>
                {/* Current Value Row */}
                <View style={Styles.row}>
                  <Text style={Styles.title}>Current Value:</Text>
                  <Text style={{ fontSize: 18 }}>₹ {_getTotalCurrentValue().toFixed(2)}</Text>
                </View>

                {/* Total Investment Row */}
                <View style={Styles.row}>
                  <Text style={Styles.title}>Total Investment:</Text>
                  <Text style={{ fontSize: 18 }}>₹ {_getTotalInvestmentValue().toFixed(2)}</Text>
                </View>

                {/* Today's Profit & Loss Row */}
                <View style={[Styles.row, { marginBottom: 20 }]}>
                  <Text style={Styles.title}>Today's Profit & Loss:</Text>
                  <Text style={{ fontSize: 18 }}>₹ {_getTodaysProfitLoss().toFixed(2)}</Text>
                </View>
              </>
            )}

            {/* Total Profit & Loss Row */}
            <View style={Styles.row}>
              <Text style={Styles.title}>Profit & Loss:</Text>
              <Text style={{ fontSize: 18 }}>₹ {_getTotalProfitLoss().toFixed(2)}</Text>
            </View>

          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  )
}

export default App

// Style sheet for layout and styling
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: '#7d017d',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerFont: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  listItem: {
    flex: 1,
    backgroundColor: "#fff",
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingVertical: 10
  },
  flexRow: {
    flexDirection: "row",
    alignSelf: "flex-end"
  },
  title: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold"
  },
  liveAmount: {
    color: "#000",
    fontWeight: "500"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5
  },
  expander: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 20, color: "#af4fdc",
  },
  footer: {
    backgroundColor: "#fff",
    padding: 20,
  },
  errorWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ff0000',
  }
});
