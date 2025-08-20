import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Divider, List, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function FlightOfferDetails({ flightData }: { flightData: any }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleAccordionPress = (index: number) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* Header Banner */}
      <LinearGradient
        colors={["#003087", "#005BB5"]}
        style={styles.headerBanner}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Your Flight Details
        </Text>
        <Text variant="bodyLarge" style={styles.headerSubtitle}>
          Review your itinerary below
        </Text>
      </LinearGradient>

      {/* Pricing Summary Card */}
      <Card style={styles.card} elevation={3}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Price Summary
          </Text>
          <View style={styles.priceRow}>
            <Text variant="bodyLarge" style={styles.priceLabel}>
              Total:
            </Text>
            <Text variant="titleMedium" style={styles.priceValue}>
              {flightData.currencyCode} {flightData.totalPrice}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text variant="bodyLarge" style={styles.priceLabel}>
              Base Fare:
            </Text>
            <Text variant="bodyLarge" style={styles.priceValue}>
              {flightData.currencyCode} {flightData.basePrice}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text variant="bodyLarge" style={styles.priceLabel}>
              Travelers:
            </Text>
            <Text variant="bodyLarge" style={styles.priceValue}>
              {flightData.totalTravelers}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Trip Details */}
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Flight Itinerary
      </Text>
      {flightData?.trips?.map((trip: any, index: number) => {
        const isExpanded = expandedIndex === index;
        const animatedHeight = useSharedValue(isExpanded ? 1 : 0);

        const animatedStyle = useAnimatedStyle(() => ({
          opacity: withTiming(isExpanded ? 1 : 0, { duration: 300, easing: Easing.out(Easing.exp) }),
          transform: [{ scaleY: withTiming(isExpanded ? 1 : 0, { duration: 300, easing: Easing.out(Easing.exp) }) }],
        }));

        return (
          <Card key={trip.tripNo} style={styles.card} elevation={3}>
            <List.Accordion
              title={
                <View style={styles.accordionTitle}>
                  <Text variant="titleLarge" style={styles.tripTitle}>
                    Trip {trip.tripNo}: {trip.from} ➡️ {trip.to}
                  </Text>
                  <View style={styles.tripSubtitle}>
                    {(trip.tripType === "RETURN" && index === 1) && (
                      <Text variant="bodyMedium" style={styles.subtitleText}>
                        Type: {trip.tripType}
                      </Text>
                    )}
                    <Text variant="bodyMedium" style={styles.subtitleText}>
                      Stops: {trip.stops}
                    </Text>
                    <Text variant="bodyMedium" style={styles.subtitleText}>
                      Duration: {trip.totalFlightDuration}
                    </Text>
                    {trip.stops !== 0 && (
                      <Text variant="bodyMedium" style={styles.subtitleText}>
                        Layover: {trip.totalLayoverDuration}
                      </Text>
                    )}
                  </View>
                </View>
              }
              left={props => <List.Icon {...props} icon="airplane" color="#005BB5" />}
              expanded={isExpanded}
              onPress={() => handleAccordionPress(index)}
              style={styles.accordion}
              titleStyle={styles.accordionTitleStyle}
            >
              <Animated.View style={[styles.cardContent, animatedStyle]}>
                <Divider style={styles.divider} />
                {trip.legs.map((leg: any, legIndex: number) => (
                  <View key={leg.legNo} style={styles.legContainer}>
                    <Text variant="titleMedium" style={styles.legTitle}>
                      {leg.departureAirport} ({leg.departureDateTime}) ➡️ {leg.arrivalAirport} ({leg.arrivalDateTime})
                    </Text>
                    <Text variant="bodyMedium" style={styles.legDetail}>
                      Flight {leg.carrierCode} {leg.flightNumber} ({leg.aircraftCode})
                    </Text>
                    {leg.operatingCarrierName && (
                      <Text variant="bodyMedium" style={styles.legDetail}>
                        Operated by: {leg.operatingCarrierName}
                      </Text>
                    )}
                    <Text variant="bodyMedium" style={styles.legDetail}>
                      Duration: {leg.duration}
                    </Text>
                    {leg.layoverAfter && (
                      <Text variant="bodyMedium" style={styles.legDetail}>
                        Layover After: {leg.layoverAfter}
                      </Text>
                    )}
                    {legIndex < trip.legs.length - 1 && <Divider style={styles.divider} />}
                  </View>
                ))}
              </Animated.View>
            </List.Accordion>
          </Card>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  headerBanner: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 32,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "#E6F0FA",
    fontWeight: "500",
  },
  card: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#003087",
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 4,
  },
  priceLabel: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  priceValue: {
    color: "#005BB5",
    fontWeight: "700",
    fontSize: 16,
  },
  accordion: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 8,
  },
  accordionTitle: {
    paddingVertical: 8,
  },
  accordionTitleStyle: {
    fontWeight: "700",
    color: "#003087",
  },
  tripTitle: {
    color: "#003087",
    fontWeight: "700",
    fontSize: 18,
  },
  tripSubtitle: {
    marginTop: 8,
    paddingLeft: 8,
  },
  subtitleText: {
    color: "#4B5EAA",
    marginBottom: 6,
    fontSize: 14,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: "#E6ECF0",
    height: 1.5,
  },
  legContainer: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  legTitle: {
    fontWeight: "700",
    color: "#003087",
    marginBottom: 8,
    fontSize: 16,
  },
  legDetail: {
    color: "#4B5EAA",
    marginBottom: 6,
    fontSize: 14,
  },
});