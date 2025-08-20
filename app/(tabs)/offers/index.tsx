import FlightCard from "@/components/FlightOfferCard";
import { useAppContext } from "@/context/AppContextProvider";
import { theme } from "@/themes/theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { router, useNavigation } from "expo-router";
import { useMemo, useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Icon, IconButton, Text } from "react-native-paper";

export default function Offers() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

  const {selectedFlightOffer, setSelectedFlightOffer, apiUrl} = useAppContext();
  const {flightOffers, searchParams, fromInput, toInput} = useAppContext();
  const navigation = useNavigation();
  
  // const tempFlights = 
  const handleBookFlight = (flightData: any) => {
     console.log("Booking flight with data: ", flightData);
    if(flightData) {
      setSelectedFlightOffer(flightData);
      // navigation.navigate("../booking/index");
      router.push("/booking/flightDetails");
      bottomSheetRef.current?.expand();
      console.log("bottomSheetRef: ", bottomSheetRef.current?.expand);
    }
  };
  // useEffect(() => {
  //   // if(searchParams.from && searchParams.to) {
  //     navigation.setOptions({
  //       headerTitle: <View>
  //         <Text>{searchParams.from}</Text>
  //         <Text>{searchParams.to}</Text>
  //       </View>
  //     });
  //   // }
  // }, []);
  return (
    <View
      style={styles.container}
    >
      {/* <View style={{ height: 100 }}> */}
        {/* <ImageBackground
          source={require('@/assets/images/worldmap2.jpg')}
          style={[ styles.background, { height: "100%", width: "100%"} ]}
          resizeMode='cover'
          resizeMethod='scale'
        > */}
        <View style={{display: 'flex', flexDirection: 'column', 
          justifyContent: 'center', marginBottom: 10 }}>
          <View style={{
            borderWidth: 0,
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 0,
            margin: 0,
          }}>
            <View style={[styles.routeCard, 
              { borderWidth: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                flexDirection: 'row',
                width: '30%', 
              }]}>
              <View>
                <Text style={styles.routeValue}>{searchParams.from}</Text>
              </View>
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <Icon source="airplane" size={20} />
                {/* <Text>{searchParams.departureDate}</Text> */}
              </View>
              <View>
                <Text style={styles.routeValue}>{searchParams.to}</Text>
              </View>
            </View>
            {/* <View style={{ marginRight: 10 }}> */}
              <IconButton
                icon={"pencil-outline"}
                size={20}
                style={{ }}
                // onPress={() => navigation.navigate("home/index")}
                onPress={() => router.push("/(tabs)/home")}
              />
            {/* </View> */}
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <Text variant="labelSmall">
              {searchParams.departureDate} | {' '}
              {searchParams.flightClass} | {' '}
              {parseInt(searchParams.adults + searchParams.children + searchParams.infants)} passengers
            </Text>
          </View>
        </View>
        {/* </ImageBackground> */}
      {/* </View> */}
      <ScrollView style={{ marginTop: 0}}>
            {
              flightOffers.length > 0 ? flightOffers.map((offer: any, index: number) => (
                // tempFlights.flightsAvailable.length > 0 ? tempFlights.flightsAvailable.map((offer: any, index: number) => (
              <View key={index} style={{ }}>
                  <FlightCard
                    flightIndex={`flight-${index}`}
                    flightData={offer} 
                    handleSubmit={() => handleBookFlight(offer)}
                  />
                </View>
              )) : (
                <View style={{ padding: 10, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{color: theme.colors.backdrop}}>No flight offers found for {fromInput} to {toInput} on {searchParams.departureDate}</Text>
                </View>
              )
            }
        {/* <Text style={styles.text}>offers screen</Text> */}
      </ScrollView>

      <BottomSheet 
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
      >
        <View>
          <Text>Bottom Sheet</Text>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "black"
  },
  background: {
    flex: 1
  },
  text: {
    color: "#fff"
  },
  routeCard: {
    backgroundColor: theme.colors.transparent,
    // borderRadius: 12,
    // padding: 16,
    marginVertical: 0,
    marginHorizontal: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 0,
    alignItems: "center",
  },
  routeValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.darkGray,
    marginBottom: 0,
  },
});