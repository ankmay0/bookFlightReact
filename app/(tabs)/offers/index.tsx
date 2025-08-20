import FlightCard from "@/components/FlightOfferCard";
import { useAppContext } from "@/context/AppContextProvider";
import { theme } from "@/themes/theme";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import { ActivityIndicator, Button, IconButton, Text, Chip } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

// Mock Expedia-like theme
const expediaTheme = {
  colors: {
    primary: "#003087", // Expedia blue
    primaryContainer: "#E6F0FA",
    surface: "#FFFFFF",
    background: "#F5F5F5",
    onSurface: "#1A1A1A",
    onSurfaceVariant: "#666666",
    outline: "#E6E6E6",
    accent: "#FFC107", // For badges like "Cheapest"
  },
  typography: {
    titleLarge: { fontSize: 22, fontWeight: "bold" },
    titleMedium: { fontSize: 16, fontWeight: "600" },
    bodyMedium: { fontSize: 14 },
    labelSmall: { fontSize: 12, fontWeight: "400" },
  },
};

export default function Offers() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "60%", "90%"], []);
  const { selectedFlightOffer, setSelectedFlightOffer, flightOffers, searchParams, fromInput, toInput } = useAppContext();
  const [sortBy, setSortBy] = useState<"price" | "duration" | "stops">("price");

  const handleBookFlight = (flightData: any) => {
    if (flightData) {
      setSelectedFlightOffer(flightData);
      router.push("/booking/flightDetails");
      bottomSheetRef.current?.expand();
    }
  };

  const handleSort = (criteria: "price" | "duration" | "stops") => {
    setSortBy(criteria);
    // Implement sorting logic here (e.g., sort flightOffers by price, duration, or stops)
    // For simplicity, this is a placeholder
    console.log(`Sorting by ${criteria}`);
  };

  const renderFlightCard = ({ item, index }: { item: any; index: number }) => {
    const isCheapest = index === 0 && sortBy === "price"; // Highlight first flight if sorted by price
    return (
      <FlightCard
        flightIndex={`flight-${index}`}
        flightData={item}
        handleSubmit={() => handleBookFlight(item)}
        isCheapest={isCheapest}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={[expediaTheme.colors.primary, expediaTheme.colors.primaryContainer]} style={styles.header}>
        <View style={styles.routeContainer}>
          <View style={styles.routeCard}>
            <Text style={styles.routeValue}>{searchParams.from}</Text>
            <Text style={styles.routeArrow}>→</Text>
            <Text style={styles.routeValue}>{searchParams.to}</Text>
          </View>
          <IconButton
            icon="pencil"
            size={24}
            onPress={() => router.push("/(tabs)/home")}
            accessibilityLabel="Edit flight search"
            style={styles.editButton}
          />
        </View>
        <Text style={styles.searchDetails}>
          {searchParams.departureDate} | {searchParams.flightClass} |{" "}
          {parseInt(searchParams.adults) + parseInt(searchParams.children) + parseInt(searchParams.infants)} passengers
        </Text>
      </LinearGradient>

      {/* Filter Bar */}
      <View style={styles.filterBar}>
        <Chip
          selected={sortBy === "price"}
          onPress={() => handleSort("price")}
          style={styles.chip}
          textStyle={styles.chipText}
        >
          Price
        </Chip>
        <Chip
          selected={sortBy === "duration"}
          onPress={() => handleSort("duration")}
          style={styles.chip}
          textStyle={styles.chipText}
        >
          Duration
        </Chip>
        <Chip
          selected={sortBy === "stops"}
          onPress={() => handleSort("stops")}
          style={styles.chip}
          textStyle={styles.chipText}
        >
          Stops
        </Chip>
      </View>

      {/* Flight List */}
      {flightOffers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No flights found for {fromInput} to {toInput} on {searchParams.departureDate}
          </Text>
          <Button
            mode="outlined"
            onPress={() => router.push("/(tabs)/home")}
            style={styles.tryAgainButton}
          >
            Try Another Search
          </Button>
        </View>
      ) : (
        <FlatList
          data={flightOffers}
          renderItem={renderFlightCard}
          keyExtractor={(item, index) => `flight-${index}`}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<ActivityIndicator size="large" color={expediaTheme.colors.primary} />}
          ListHeaderComponent={
            <Text style={styles.resultsCount}>
              {flightOffers.length} flight{flightOffers.length !== 1 ? "s" : ""} found
            </Text>
          }
        />
      )}

      {/* Bottom Sheet */}
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} enablePanDownToClose>
        <View style={styles.bottomSheetContent}>
          <Text style={expediaTheme.typography.titleLarge}>Flight Details</Text>
          {selectedFlightOffer ? (
            <View style={styles.bottomSheetDetails}>
              <Text style={expediaTheme.typography.bodyMedium}>
                Airline: {selectedFlightOffer.trips[0].legs[0].carrierName}
              </Text>
              <Text style={expediaTheme.typography.bodyMedium}>
                Price: {selectedFlightOffer.currencyCode} {selectedFlightOffer.totalPrice}
              </Text>
              <Text style={expediaTheme.typography.bodyMedium}>
                Departure: {selectedFlightOffer.trips[0].legs[0].departureAirport} at{" "}
                {new Date(selectedFlightOffer.trips[0].legs[0].departureDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Text style={expediaTheme.typography.bodyMedium}>
                Arrival: {selectedFlightOffer.trips[0].legs.slice(-1)[0].arrivalAirport} at{" "}
                {new Date(selectedFlightOffer.trips[0].legs.slice(-1)[0].arrivalDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Button
                mode="contained"
                onPress={() => router.push("/booking/flightDetails")}
                style={styles.bookButton}
              >
                Continue to Booking
              </Button>
            </View>
          ) : (
            <Text style={expediaTheme.typography.bodyMedium}>Select a flight to view details</Text>
          )}
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: expediaTheme.colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  routeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: expediaTheme.colors.surface,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginRight: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  routeValue: {
    ...expediaTheme.typography.titleMedium,
    color: expediaTheme.colors.onSurface,
  },
  routeArrow: {
    fontSize: 18,
    marginHorizontal: 12,
    color: expediaTheme.colors.onSurface,
  },
  searchDetails: {
    ...expediaTheme.typography.labelSmall,
    textAlign: "center",
    marginTop: 12,
    color: expediaTheme.colors.onSurfaceVariant,
  },
  filterBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: expediaTheme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: expediaTheme.colors.outline,
  },
  chip: {
    backgroundColor: expediaTheme.colors.surface,
    borderRadius: 16,
  },
  chipText: {
    ...expediaTheme.typography.bodyMedium,
    color: expediaTheme.colors.onSurface,
  },
  listContent: {
    padding: 16,
  },
  resultsCount: {
    ...expediaTheme.typography.bodyMedium,
    color: expediaTheme.colors.onSurface,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    ...expediaTheme.typography.bodyMedium,
    color: expediaTheme.colors.onSurfaceVariant,
    textAlign: "center",
    marginBottom: 16,
  },
  tryAgainButton: {
    borderRadius: 8,
    borderColor: expediaTheme.colors.primary,
  },
  bottomSheetContent: {
    padding: 24,
  },
  bottomSheetDetails: {
    marginTop: 16,
    gap: 12,
  },
  bookButton: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: expediaTheme.colors.primary,
  },
});