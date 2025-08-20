import { theme } from "@/themes/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function FlightCard({
  flightData,
  handleSubmit,
  flightIndex,
}: { flightData: any; handleSubmit: () => void; flightIndex: string }) {
  const { currencyCode, totalPrice, basePrice, trips } = flightData;

  const formatDateTime = React.useMemo(
    () => (dateTime: any) => {
      const date = new Date(dateTime);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    },
    []
  );

  return (
    <Card mode="contained" style={styles.card}>
      {trips.map((trip: any, index: number) => {
        const firstLeg = trip.legs[0];
        const lastLeg = trip.legs[trip.legs.length - 1];
        return (
          <View key={index} style={styles.tripContainer}>
            <Card.Title
              title={
                <View style={styles.titleContainer}>
                  <Image
                    source={{ uri: `https://content.airhex.com/content/logos/airlines_${firstLeg.operatingCarrierCode}_100_100_s.png` }}
                    style={styles.airlineLogo}
                  />
                  <Text variant="labelLarge" style={styles.airlineName}>
                    {firstLeg.carrierName} ({firstLeg.aircraft})
                  </Text>
                </View>
              }
              subtitle={
                <Text variant="labelSmall" style={styles.subtitle}>
                  {trip.stops > 0 ? `Layover ${trip.totalLayoverDuration}` : "Non-Stop"}
                </Text>
              }
              right={() =>
                trip.tripType === "RETURN" && index === 1 ? (
                  <View style={styles.returnTag}>
                    <Text variant="bodySmall" style={styles.returnText}>
                      Return
                    </Text>
                    <MaterialCommunityIcons name="arrow-u-left-top" size={16} color={theme.colors.onPrimary} />
                  </View>
                ) : null
              }
              style={styles.cardTitle}
            />
            <Card.Content style={styles.cardContent}>
              <View style={styles.flightDetails}>
                <View style={styles.locationContainer}>
                  <Text style={styles.location} variant="titleMedium">
                    {firstLeg.departureAirport}
                  </Text>
                  <Text style={styles.dateTime} variant="bodySmall">
                    {formatDateTime(firstLeg.departureDateTime)}
                  </Text>
                </View>
                <View style={styles.durationContainer}>
                  <Text variant="labelSmall">{trip.totalFlightDuration}</Text>
                  <View style={styles.stopsBar}>
                    <View style={styles.bar} />
                    {trip.legs.map((_: any, i: number) => (
                      <View key={i} style={styles.stopDot} />
                    ))}
                  </View>
                  <Text variant="bodySmall">{`${trip.stops} Stop${trip.stops > 1 ? "s" : ""}`}</Text>
                </View>
                <View style={styles.locationContainer}>
                  <Text style={styles.location} variant="titleMedium">
                    {lastLeg.arrivalAirport}
                  </Text>
                  <Text style={styles.dateTime} variant="bodySmall">
                    {formatDateTime(lastLeg.arrivalDateTime)}
                  </Text>
                </View>
              </View>
            </Card.Content>
          </View>
        );
      })}
      <View style={styles.footer}>
        <View>
          <Text variant="titleMedium">{`${currencyCode} ${totalPrice}`}</Text>
          <Text variant="bodySmall" style={styles.basePrice}>
            {`Base: ${currencyCode} ${basePrice}`}
          </Text>
        </View>
        <Button mode="contained" onPress={handleSubmit} style={styles.bookButton}>
          Book
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 8,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  tripContainer: {
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  airlineLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  airlineName: {
    fontWeight: "bold",
    color: theme.colors.onSurface,
  },
  subtitle: {
    color: theme.colors.onSurfaceVariant,
  },
  returnTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  returnText: {
    color: theme.colors.onPrimary,
    marginRight: 4,
  },
  cardTitle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "transparent",
  },
  cardContent: {
    padding: 8,
  },
  flightDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.onSurface,
  },
  dateTime: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  durationContainer: {
    alignItems: "center",
  },
  stopsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    height: 10,
    alignItems: "center",
  },
  bar: {
    height: 3,
    backgroundColor: theme.colors.outline,
    width: "100%",
    position: "absolute",
    top: 3.5,
  },
  stopDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
  },
  basePrice: {
    color: theme.colors.onSurfaceVariant,
  },
  bookButton: {
    borderRadius: 8,
  },
});