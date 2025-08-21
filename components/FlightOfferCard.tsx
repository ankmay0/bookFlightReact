import { theme } from '@/themes/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

export default function FlightCard({ flightData, handleSubmit, flightIndex }: 
    { flightData: any, handleSubmit: () => void, flightIndex: string }) {
    // const {setSelectedFlightOffer} = useAppContext();
    const { currencyCode, totalPrice, basePrice, seatsAvailable, trips } = flightData;
    // const router = useRouter();


    const formatDateTime = (dateTime: any) => {
        const date = new Date(dateTime);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const handleBookFlight = () => {
        console.log("details clicked")
        handleSubmit();
    };

    return (
        <View key={flightIndex}>
            <Card
                key={flightIndex} 
                mode='contained'
                style={{ 
                    marginHorizontal: 5, 
                    marginBottom: 10, 
                    padding: 5,
                    borderWidth: 0, 
                    borderRadius: 12,
                    backgroundColor: theme.colors.primaryContainer,
                    // overflow: 'hidden',
                    // ...(Platform.OS === "android" && {
                        elevation: 0,
                        shadowOpacity: 0,
                        borderStartWidth: 0,
                        borderEndWidth: 0,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        // borderTopWidth: 5,
                        // borderBottomWidth: 5,
                        // borderWidth: 1,
                        borderColor: theme.colors.lightGray,
                    // }),
                }}
                // theme={{
                //     colors: {
                //         elevation: { level2: "transparent" }
                //     }
                // }}
            >
                {
                    trips.map((trip: any, index: number) => {
                        const firstLeg = trip.legs[0];
                        const lastLeg = trip.legs[trip.legs.length - 1];
                        return (
                            <View key={index}>
                            <Card.Title
                                titleStyle={{
                                    marginBottom: 0,
                                    paddingBottom: 0,
                                    height: 30,
                                }}
                                subtitleStyle={{
                                    marginTop: -10,
                                    marginBottom: 15,
                                    paddingBottom: 0,
                                    marginLeft: 35
                                }}
                                style={{
                                    // borderWidth: 1,
                                    paddingHorizontal: 4,
                                    // paddingVertical: 0,
                                    backgroundColor: "transparent",
                                    paddingTop: 2,
                                    margin: 3,
                                    marginBottom: -20,
                                    minHeight: 40,
                                    overflow: 'visible'
                                }}
                                // title={``} 
                                right={() => (
                                    <View style={{ alignItems: "center", marginRight: 10 }}>
                                        {(trip.tripType === "RETURN" && index === 1) && (
                                            <View style={{ 
                                                display: 'flex', flexDirection: 'row', 
                                                alignItems: 'center', justifyContent: 'center',
                                                marginBottom: 5, 
                                                backgroundColor: theme.colors.primary,
                                                borderRadius: 12,
                                                paddingHorizontal: 10
                                            }}
                                            >
                                                <Text variant="bodyMedium" style={{ color: theme.colors.disabled }}>Return</Text>
                                                <MaterialCommunityIcons 
                                                    name="arrow-u-left-top" 
                                                    size={16} color={theme.colors.disabled} />
                                            </View>
                                        )}
                                    </View>
                                )}
                                title={
                                    <View style={{ 
                                        flexDirection: "column", 
                                        alignItems: "flex-start", 
                                        justifyContent: 'center',
                                        marginTop: 0,
                                        // borderWidth: 1,
                                        paddingBottom: 0, 
                                        padding: 0,
                                    }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                source={{ uri: `https://content.airhex.com/content/logos/airlines_${firstLeg.operatingCarrierCode}_100_100_s.png` }}
                                                style={{ width: 24, height: 24, marginRight: 8 }}
                                            />
                                            {/* <Text>Airline: {firstLeg.carrierName}</Text> */}
                                            <Text 
                                                variant='labelSmall' 
                                                style={{ fontWeight: "bold"}}
                                            >{firstLeg.carrierName}</Text>
                                            <Text 
                                                variant='labelMedium' 
                                                style={{ fontWeight: "normal", color: theme.colors.darkGray}}
                                            >({firstLeg.aircraft})</Text>
                                        </View>
                                    </View>
                                }
                                subtitle={
                                    trip.stops > 0 ?
                                    <View style={{
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        // marginLeft: 35,
                                        // marginBottom: 0,
                                        // display: 'flex', flexDirection: 'row', alignItems: 'center' 
                                        }}>
                                            <Text variant='labelSmall'>Layover {trip.totalLayoverDuration}</Text>
                                    </View> : 
                                    <View style={{
                                        alignItems: 'flex-start',
                                        justifyContent: 'flex-start',
                                        // marginLeft: 35,
                                        // marginBottom: 10,
                                        // display: 'flex', flexDirection: 'row', alignItems: 'center' 
                                        }}>
                                        <Text variant='labelSmall'>Non-Stop</Text>
                                    </View>
                                }
                            />
                            <Card.Content style={{ paddingVertical: 5, }}>
                                {/* {trips.map((trip: any, index: number) => {
                                const firstLeg = trip.legs[0];
                                const lastLeg = trip.legs[trip.legs.length - 1];

                                return ( */}
                                    <View key={`leg-${index}`} style={{ 
                                        marginBottom: 15, 
                                        alignItems: 'center', 
                                        display: 'flex', 
                                        flexDirection: 'row', 
                                        justifyContent: 'space-between',
                                        alignContent: 'center', 
                                        // borderWidth: 1, borderColor: 'red'
                                    }}>
                                        {/* <Button onPress={()=>console.log(firstLeg)}>leg</Button>
                                        <View>
                                            <Text>{firstLeg.carrierCode}</Text>
                                        </View> */}
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={styles.locations} variant="titleMedium">{firstLeg.departureAirport}</Text>
                                            <Text style={styles.dateTime} variant="bodySmall">{formatDateTime(firstLeg.departureDateTime)}</Text>
                                        </View>
                                        {
                                            <View style={{
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <View style={{ marginBottom: -8}}>
                                                    <Text variant="labelSmall">{trip.totalFlightDuration}</Text>
                                                </View>
                                                <View style={{
                                                    height: 30,
                                                    // borderWidth: 1,
                                                    width: 80,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    marginVertical: 0,
                                                    // borderWidth: 1,
                                                }}>
                                                    {/* bar */}
                                                    <View
                                                        style={{
                                                        height: 3,
                                                        backgroundColor: theme.colors.lightGray,
                                                        width: "100%",
                                                        position: "absolute",
                                                        top: 12,
                                                        left: 0,
                                                        marginTop: 1,
                                                        zIndex: 1,
                                                        // borderWidth: 1
                                                    }}
                                                />
                                                {/* dots */}
                                                    <View
                                                        style={{
                                                            flexDirection: "row",
                                                            justifyContent: "space-evenly",
                                                            alignItems: 'center',
                                                            width: "90%",
                                                            zIndex: 2,
                                                            // borderWidth: 1
                                                        }}
                                                    > 
                                                        {
                                                            trip.legs.slice(0, -1).map((leg: any, index: number) => {
                                                                return (
                                                                    <View key={index}>
                                                                        <View
                                                                            style={{
                                                                                width: 10,
                                                                                height: 10,
                                                                                borderRadius: 5,
                                                                                backgroundColor: theme.colors.primary,
                                                                                borderWidth: 2,
                                                                                borderColor: theme.colors.primary,
                                                                            }}
                                                                        />
                                                                    </View>
                                                                )
                                                            })
                                                        }
                                                    </View>
                                                </View>
                                                {
                                                    trip.stops > 0 &&
                                                    <View style={{ marginTop: -5}}>
                                                        <Text variant='bodySmall'>{`${trip.stops} Stop${trip.stops > 1 ? 's' : ''}`}</Text>
                                                    </View>
                                                }
                                            </View>
                                        }
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={styles.locations} variant="titleMedium">{lastLeg.arrivalAirport}</Text>
                                            <Text style={ styles.dateTime } variant="bodySmall">{formatDateTime(lastLeg.arrivalDateTime)}</Text>
                                        </View>
                                    </View>
                                {/* );
                                })} */}
                            </Card.Content>
                            </View>
                        )
                    })
                }
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderTopWidth: 1,
                            borderTopColor: theme.colors.lightGray,
                        }}
                    >
                        <View>
                            <Text variant="titleMedium">
                            {`Total: ${currencyCode} ${totalPrice}`}
                            </Text>
                            <Text variant="bodySmall" style={{ color: theme.colors.backdrop }}>
                            {`Base: ${currencyCode} ${basePrice}`}
                            </Text>
                        </View>

                        {/* <IconButton
                            icon="arrow-right"
                            size={24}
                            onPress={handleBookFlight}
                            mode="contained"
                        /> */}
                        {/* <MaterialCommunityIcons 
                            name="menu-right"
                            size={24}
                            color={theme.colors.primary}
                            onPress={handleBookFlight}
                        /> */}
                        <Button onPress={handleBookFlight}>Details</Button>
                    </View>
                {/* </LinearGradient> */}
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    locations: { 
        fontSize: 16,
        fontWeight: 'bold', 
        fontStyle:"italic"
    },
    dateTime: {
        fontSize: 12, 
        fontWeight: 'bold'
    }
});
