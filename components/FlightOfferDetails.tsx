import { useState } from "react";
import { View } from "react-native";
import { Card, Divider, List, Text } from "react-native-paper";

export default function FlightOfferDetails({ flightData }: { flightData: any }) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const handleAccordionPress = (index: number) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    }
    return (
        <View style={{  }}>
        {/* Pricing Summary */}
        <Card style={{ marginBottom: 15 }}>
          <Card.Content>
            <Text variant="titleMedium">Price Summary</Text>
            <Text variant="bodyMedium" >
              Total: {flightData.currencyCode} {flightData.totalPrice}
            </Text>
            <Text variant="bodyMedium" >Base: {flightData.currencyCode} {flightData.basePrice}</Text>
            <Text variant="bodyMedium" >Travelers: {flightData.totalTravelers}</Text>
          </Card.Content>
        </Card>
  
        {/* Trips */}
        {flightData && flightData.trips.map((trip: any, index: number) => (
          <Card key={trip.tripNo} style={{ marginBottom: 15 }}>
            <List.Accordion 
                title={
                <Card.Title
                    title={
                        <>
                            <Text variant="titleMedium">
                            Trip {trip.tripNo} - {trip.from} ➡ {trip.to}
                            </Text>
                        </>
                    }
                    subtitle={
                        <View style={{ marginTop: 4 }}>
                            {
                                (trip.tripType === "RETURN" && index === 1) &&
                                <Text variant="bodyMedium" >Type: {trip.tripType}</Text>
                            }
                            <Text variant="bodyMedium" >Stops: {trip.stops}</Text>
                            <Text variant="bodyMedium" >Total Duration: {trip.totalFlightDuration}</Text>
                            {trip.stops !== 0 && (
                            <Text variant="bodyMedium" >Layover: {trip.totalLayoverDuration}</Text>
                            )}
                        </View>
                    }
                >
                </Card.Title>
                }
                left={props => <List.Icon {...props} icon="airplane" />}
                expanded={expandedIndex === index}
                onPress={() => handleAccordionPress(index)}
                style={{
                    // borderWidth: 1,
                    // borderColor: 'red',
                    // borderRadius: 12
                }}
            >
                <Card.Content style={{  }}>
                <Divider style={{ marginVertical: 10 }} />
    
                {/* Legs inside this trip */}
                {trip.legs.map((leg: any, index: number) => (
                    <View key={leg.legNo} style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {leg.departureAirport} ({leg.departureDateTime}) ➡ {leg.arrivalAirport} ({leg.arrivalDateTime})
                    </Text>
                    <Text variant="bodyMedium" >
                        Flight {leg.carrierCode} {leg.flightNumber} ({leg.aircraftCode})
                    </Text>
                    {leg.operatingCarrierName && (
                        <Text variant="bodyMedium" >Operated by: {leg.operatingCarrierName}</Text>
                    )}
                    <Text variant="bodyMedium" >Duration: {leg.duration}</Text>
                    {leg.layoverAfter && (
                        <Text variant="bodyMedium" >Layover After: {leg.layoverAfter}</Text>
                    )}
                    <Divider style={{ marginTop: 5 }} />
                    </View>
                ))}
                </Card.Content>
            </List.Accordion>
          </Card>
        ))}
      </View>
    )
}
