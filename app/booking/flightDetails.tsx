import FlightOfferDetailsNew from "@/components/FlightOfferDetailsNew";
import { useAppContext } from "@/context/AppContextProvider";
import { theme } from "@/themes/theme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

export default function FlightDetails() {
    const {selectedFlightOffer} = useAppContext();
    return (
        <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryGlass]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
                // borderColor: theme.colors.primaryGlass,
                // borderRadius: 12,
                overflow: 'hidden',
                width: '100%',
                height: '100%'
            }}
        >
            <ScrollView
                contentContainerStyle={{ paddingBottom:50 }} 
                style={{ padding: 10 }}
            >
                <FlightOfferDetailsNew
                    // flightData={selectedFlightOffer}
                />
                <Button
                    mode="contained"
                    onPress={() => router.push("/booking")}
                >
                    Continue
                </Button>
            </ScrollView>
        </LinearGradient>
    )
}