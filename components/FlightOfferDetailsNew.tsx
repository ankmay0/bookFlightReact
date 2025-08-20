// import { useState } from "react";
// import { View } from "react-native";
// import { Card, List, Text } from "react-native-paper";

// export default function FlightOfferDetailsNew({ flightData }: { flightData: any }) {
//      const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
//         const handleAccordionPress = (index: number) => {
//             setExpandedIndex(index === expandedIndex ? null : index);
//         }
//     return (
//         <View>
//            <Card style={{ marginBottom: 15, borderRadius: 12 }}>
//   <List.Accordion
//     title={
//       <Card.Title
//         title={
//           <Text variant="titleMedium">
//             {trip.from} ➡ {trip.to}
//           </Text>
//         }
//         subtitle={
//           <View style={{ marginTop: 4 }}>
//             <Text variant="bodyMedium">Stops: {trip.stops}</Text>
//             <Text variant="bodyMedium">Duration: {trip.totalFlightDuration}</Text>
//             {trip.stops !== 0 && (
//               <Text variant="bodyMedium">Layover: {trip.totalLayoverDuration}</Text>
//             )}
//             <Text variant="bodyMedium">Class: {trip.travelClass}</Text>
//           </View>
//         }
//       />
//     }
//     left={(props) => <List.Icon {...props} icon="airplane" />}
//     expanded={expandedIndex === index}
//     onPress={() => handleAccordionPress(index)}
//   >
//     <Card.Content>
//       <Divider style={{ marginVertical: 10 }} />

//       {trip.legs.map((leg: any) => (
//         <View key={leg.legNo} style={{ marginBottom: 15 }}>
//           {/* Flight Info */}
//           <Text style={{ fontWeight: "bold", marginBottom: 2 }}>
//             {leg.carrierCode} {leg.flightNumber} ({leg.aircraftCode})
//           </Text>
//           {leg.operatingCarrierName && (
//             <Text variant="bodyMedium" style={{ marginBottom: 4 }}>
//               Operated by: {leg.operatingCarrierName}
//             </Text>
//           )}

//           {/* Timings */}
//           <View style={{ marginBottom: 6 }}>
//             <Text variant="bodyMedium">
//               Departure: {leg.departureAirport} ({leg.departureDateTime})
//             </Text>
//             <Text variant="bodyMedium">
//               Arrival: {leg.arrivalAirport} ({leg.arrivalDateTime})
//             </Text>
//             <Text variant="bodyMedium">Duration: {leg.duration}</Text>
//             {leg.layoverAfter && (
//               <Text variant="bodyMedium">Layover After: {leg.layoverAfter}</Text>
//             )}
//           </View>

//           <Divider />
//         </View>
//       ))}

//       {/* Pricing Summary inside each Trip (optional) */}
//       <View style={{ marginTop: 10 }}>
//         <Text variant="titleSmall">Price Summary</Text>
//         <Text variant="bodyMedium">
//           Total: {flightData.currencyCode} {flightData.totalPrice}
//         </Text>
//         <Text variant="bodyMedium">
//           Base: {flightData.currencyCode} {flightData.basePrice}
//         </Text>
//         <Text variant="bodyMedium">Travelers: {flightData.totalTravelers}</Text>
//       </View>
//     </Card.Content>
//   </List.Accordion>
// </Card>

//         </View>
//     );
// }
