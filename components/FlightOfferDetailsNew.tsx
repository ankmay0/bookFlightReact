import { useAppContext } from "@/context/AppContextProvider";
import { theme } from "@/themes/theme";
import { formatDate, formatTime } from "@/utils/helper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Chip, Divider, Text } from "react-native-paper";

// export default function FlightOfferDetailsNew({ flightData }: { flightData: any }) {
export default function FlightOfferDetailsNew() {
    const {selectedFlightOffer: flightData} = useAppContext();
    return (
        <>
            <ScrollView style={styles.container}>
                {/* <Text style={styles.title}>Flight Details</Text> */}
                {
                    flightData && flightData.trips.map((trip: any, index: number) => (
                        <View key={index}>
                        {/* <Button onPress={()=>console.log(trip)}>trip</Button> */}
                            <Chip 
                                icon={"airplane-takeoff"}
                                style={{ alignSelf: "flex-start", marginBottom: 8 }}
                            >
                            {
                                (trip.tripType === "ONE_WAY" || (trip.tripType == "RETURN" && index === 0)) ? "Outbound Trip" :
                                (trip.tripType === "RETURN" && index === 1) ? "Return Trip" : 
                                `Trip ${trip.tripNo}`
                            }</Chip>
                        {
                            trip.legs.length > 0 && trip.legs.map((leg: any, legIdx: number) => (
                                <View key={legIdx}>
                                    <Text variant="titleSmall" style={{ fontWeight: "bold", marginBottom: 5 }}>Leg {legIdx + 1} of {trip.legs.length}</Text>
                                    <Card style={styles.card}>
                                        <Card.Title 
                                            title={leg.carrierName}
                                            left={(props) => <MaterialCommunityIcons
                                                name="airplane" size={35} />}
                                        />
                                        <Card.Content>
                                            <View style={styles.rowFlex}>
                                                <View>
                                                    <Text style={styles.city}>Delhi</Text>  {/* change to leg.departureCity */}
                                                    <Text style={styles.airport}>{leg.departureAirport}</Text>
                                                </View>
                                                <View style={styles.columnFlex}>
                                                    <Text style={styles.time}>{formatTime(leg.departureDateTime)}</Text>
                                                    <Text style={styles.date}>{formatDate(leg.departureDateTime)}</Text>
                                                </View>
                                            </View>

                                            <View style={styles.timeline} />

                                             <View style={styles.rowFlex}>
                                                <View>
                                                    <Text style={styles.city}>New York City</Text>  {/* change to leg.arrivalCity */}
                                                    <Text style={styles.airport}>{leg.arrivalAirport}</Text>
                                                </View>
                                                <View style={styles.columnFlex}>
                                                    <Text style={styles.time}>{formatTime(leg.arrivalDateTime)}</Text>
                                                    <Text style={styles.date}>{formatDate(leg.arrivalDateTime)}</Text>
                                                </View>
                                            </View>

                                            {/* <Text style={styles.time}>{formatDateTime(leg.arrivalDateTime)}</Text> */}

                                            <Text style={styles.flightInfo}>Travel Time: {leg.duration}</Text>
                                            
                                            <Divider style={styles.divider} />

                                        </Card.Content>
                                    </Card>
                                            <View style={styles.row}>
                                                <Text style={styles.aircraftDetails}>Aircraft</Text>
                                                <Text style={styles.aircraftDetails}>{leg.aircraft}</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <Text style={styles.aircraftDetails}>Cabin</Text>
                                                <Text style={styles.aircraftDetails}>Economy</Text> {/* change to leg.cabinClass*/}
                                            </View>

                                            <Text style={styles.amenitiesTitle}>Amenities</Text>
                                            <View style={styles.amenities}>
                                                <View style={styles.amenityItem}>
                                                    <MaterialCommunityIcons name="wifi" size={20}/>
                                                    <Text>Wi-fi</Text>
                                                </View>
                                                <View style={styles.amenityItem}>
                                                    <MaterialCommunityIcons name="power-plug-outline" size={20}/>
                                                    <Text>Power Outlet</Text>
                                                </View>
                                                <View style={styles.amenityItem}>
                                                    <MaterialCommunityIcons name="television-classic" size={20}/>
                                                    <Text>Entertainment</Text>
                                                </View>
                                            </View>
                                    {
                                        leg.layoverAfter != null &&
                                        <View style={styles.stopoverContainer}>
                                                <MaterialCommunityIcons name="clock-outline" size={20} />
                                            <Text style={styles.stopoverText}>{leg.layoverAfter} layover in {leg.arrivalAirport}</Text>
                                        </View>
                                    }
                                </View>
                            ))
                        }
                        <Divider style={[styles.divider, { height: 3 }]} />
                        </View>
                    ))
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        borderRadius: 32,
        marginBottom: 16,
        // backgroundColor: theme.colors.primaryGlass,
    },
    title: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        marginBottom: 16,
        backgroundColor: theme.colors.surface
    },
    city: {
        fontSize: 20,
        color: theme.colors.darkGray,
        fontWeight: 'bold',
        marginTop: 0,
    },
    airport: {
        fontSize: 14,
        color: theme.colors.darkGray,
    },
    time: {
        fontSize: 20,
        color: theme.colors.darkGray,
        fontWeight: 'bold',
        // marginBottom: 10,
    },
    date: {
        fontSize: 14,
        color: theme.colors.darkGray,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
        // marginBottom: 10,
    },
    flightInfo: {
        marginTop: 10,
        fontStyle: 'italic',
        color: '#aaa',
    },
    divider: {
        marginVertical: 10,
        backgroundColor: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    rowFlex: { 
        display: 'flex', 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: 'center' 
    },
    columnFlex: { 
        display: 'flex', 
        flexDirection: "column", 
        // justifyContent: "space-between", 
        alignItems: 'center' 
    },
    aircraftDetails: { 
        fontWeight: "bold", 
        // paddingHorizontal: 10 
    },
    amenitiesTitle: {
        marginTop: 10,
        fontWeight: 'bold',
        color: 'white',
    },
    amenities: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    amenityItem: {
        flexDirection: "row",
        alignItems: 'flex-start',
        gap: 4,
    },
    stopoverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        gap: 8,
    },
    stopoverText: {
        fontSize: 14,
        color: '#ccc',
    },
    button: {
        marginTop: 20,
        borderRadius: 30,
    },
    timeline: {
        height: 30,
        borderLeftWidth: 2,
        borderLeftColor: 'gray',
        marginVertical: 10,
        marginLeft: 5,
    },
})