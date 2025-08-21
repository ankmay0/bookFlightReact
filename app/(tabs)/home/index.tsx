import AutocompleteInput from '@/components/AutocompleteInput';
import DatePickerInput from '@/components/DatePickerInput';
import MenuDropdown from '@/components/MenuDropdown';
import { useAppContext } from '@/context/AppContextProvider';
import { theme } from '@/themes/theme';
import { convertToQueryParams } from '@/utils/helper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import axiosInstance from '../../../config/axiosConfig';

axiosInstance.interceptors.request.use(config => {
    return config;
});

export default function Home() {
  const {
    searchParams,
    setSearchParams,
    fromLoading,
    setFromLoading,
    fromInput,
    setFromInput,
    fromSuggestions,
    setFromSuggestions,
    toLoading,
    setToLoading,
    toInput,
    setToInput,
    toSuggestions,
    setToSuggestions,
    setFlightOffers,
    flightClasses,
    apiUrl, setApiUrl
  } = useAppContext();

  // const theme = useTheme();

  const [offersLoading, setOffersLoading] = useState(false);
  // const [inputUrl, setInputUrl] = useState("");
  const [showReturnDate, setShowReturnDate] = useState(false);
  const [tripType, setTripType] = useState("oneWay");
  
  const router = useRouter();
  const navigation = useNavigation();

  const fetchSuggestions = async (type: 'from' | 'to', keyword: string) => {
    try {
      if (keyword.length < 3) return;
      type === "from" ? setFromLoading(true) : setToLoading(true);
      const response = await axiosInstance.get(`/locations/search?keyword=${keyword}`);
     // const response = await axios.get(`${apiUrl}/locations/search?keyword=${keyword}`);

      // const suggestions = response.data?.flatMap((entry: any) => {
      //   return entry.groupData.length > 0 ? [entry, ...entry.groupData] : [entry];
      // });

      const suggestions = response.data.locationResponses
      .flatMap((entry: any) => (
        entry.group_data.simpleAirports.length > 0 
        ? [entry, ...entry.group_data.simpleAirports] 
        : [entry]
      ));
      
      if (type === 'from') setFromSuggestions(suggestions);

      if (type === 'to') setToSuggestions(suggestions);
    } catch (error: any) {
      console.error("Error fetching suggestions: ", error);
      alert("Failed to fetch suggestions. Please try again.");
      if (type === 'from') setFromSuggestions([]);
      if (type === 'to') setToSuggestions([]);
      return;
    } finally {
      type === "from" ? setFromLoading(false) : setToLoading(false);
    }
  }

  const handleFromInputChange = (text: string) => {
    if (text == "" || text == null || text == undefined) {
      setFromSuggestions([]);
      setFromInput("");
      setFromLoading(false);
      setSearchParams({ ...searchParams, from: "" });
      return;
    }
    setFromInput(text);
    setFromLoading(true);
    fetchSuggestions('from', text).then(() => {
      setFromLoading(false);
    });
  }

  const handleToInputChange = (text: string) => {
    if (text == "" || text == null || text == undefined) {
      setToSuggestions([]);
      setToInput("");
      setToLoading(false);
      setSearchParams({ ...searchParams, to: "" });
      return;
    }
    setToInput(text);
    setToLoading(true);
    fetchSuggestions('to', text).then(() => {
      setToLoading(false);
    });
  }

  const handleChange = (field: keyof typeof searchParams) => (value: string) => {
    setSearchParams({
      ...searchParams,
      [field]: value
    });
  }

  const swapLocations = () => {
    if (!searchParams.from || !searchParams.to) return;
    const temp = searchParams.from;
    setFromInput(toInput);
    setToInput(fromInput);
    setFromSuggestions([]);
    setToSuggestions([]);
    setFromLoading(false);
    setToLoading(false);
    setSearchParams((prev: any) => {
      return {
        ...prev,
        from: prev.to,
        to: temp
      }
    });
  }

  const handleSubmit = async () => {
    setOffersLoading(true);
    try {
      if (!searchParams.from || !searchParams.to || !searchParams.departureDate || !searchParams.flightClass || searchParams.adults < 1) {
        alert("Please fill all required fields");
        return;
      }
      const params = {
        originLocationCode: searchParams.from,
        destinationLocationCode: searchParams.to,
        departureDate: searchParams.departureDate,
        adults: searchParams.adults,
        children: searchParams.children,
        infants: searchParams.infants,
        travelClass: searchParams.flightClass.toUpperCase(),
        currencyCode: "USD",
        max: 20
      }

      if(searchParams.returnDate) {
        Object.assign(params, {returnDate: searchParams.returnDate});
      }

      const queryparams = convertToQueryParams(params);
       const response = await axiosInstance.get(`/flights/search?${queryparams}`);
     // const response = await axios.get(`${apiUrl}/flights/search?${queryparams}`);
      // console.log("Flight offers response: ", response);
      setFlightOffers(response.data.flightsAvailable);
      setTimeout(() => {
        router.push("/offers");
      }, 50);
    } catch (error) {
      console.error("Error fetching flight offers: ", error);
      alert("Failed to fetch flight offers. Please try again.");
      setOffersLoading(false);
    } finally {
      setOffersLoading(false);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="account"
          size={24}
          style={{ backgroundColor: theme.colors.background, borderRadius: 50 }}
          // onPress={() => navigation.navigate('Profile')}
          />
        ),
        headerLeft: () => (
          <IconButton
          icon="menu"
          size={24}
          // style={{ backgroundColor: theme.colors.background, borderRadius: 50 }}
          // onPress={() => openDrawer()}
        />
      ),
      // headerStyle: {
      //   backgroundColor: "#1673bee702",
      // },
      headerBackground: () => (
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryGlass]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderColor: theme.colors.primaryGlass,
            // borderRadius: 12,
            overflow: 'hidden',
            width: '100%',
            height: '100%'
          }}
        />
        // <Image
        //   source={require('../../../assets/images/flight-bg1.avif')}
        //   style={{ width: '100%', height: '100%' }}
        // />
      ),
    })
  }, []);

  return (
    <View style={{flex: 1 }}>
      <ImageBackground
        source={require('@/assets/images/flight-bg1.avif')}
        style={[ styles.background ]}
        resizeMode='cover'
        resizeMethod='scale'
      >
        <View style={styles.container}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: theme.colors.lightGray }}>
              Welcome
            </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.colors.background }}>
              User
            </Text>
            <Text style={{ fontSize: 16, color: theme.colors.disabled }}>
              Find the best flight deals
            </Text>
          </View>
            {/* <TextInput 
              label="set the api url"
              mode="outlined"
              style={styles.input}
              value={inputUrl}
              onChangeText={setInputUrl}
            />
            <Button mode='outlined' onPress={() => setApiUrl("http://"+inputUrl.trim().toLowerCase()+":8080")}>set url</Button> */}

              <View style={{ marginBottom: 10, paddingVertical: 0, borderWidth: 1, borderColor: theme.colors.primary, borderRadius: 50, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Button mode={tripType == "oneWay" ? 'contained' : 'text'} onPress={() => {
                    setTripType("oneWay");
                    setShowReturnDate(false);
                  }}>One-way</Button>
                <Button mode={tripType == "roundTrip" ? 'contained' : 'text'} onPress={() => {
                    setTripType("roundTrip");
                    setShowReturnDate(true);
                  }}>Round-trip</Button>
                <Button mode={tripType == "multiCity" ? 'contained' : 'text'} onPress={() => {
                    setTripType("multiCity")
                    setShowReturnDate(false);
                  }}>Multi-city</Button>
              </View>
            {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> */}
           <View style={{ 
              // borderWidth: 1, 
              // borderColor: theme.colors.darkGray, 
              borderRadius: 12, 
              padding: 10,
              backgroundColor: theme.colors.translucent,
            }}>
              
              <View style={{ position: 'relative'}}>
                  <View style={{ display: 'flex', flexDirection: 'column'}}>
                    <View style={{ marginBottom: 0 }}>
                      <AutocompleteInput
                        options={fromSuggestions}
                        inputLabel={"From"}
                        inputValue={fromInput}
                        onInputChange={handleFromInputChange}
                        onSelectOption={(option: any) => {
                          setSearchParams({ ...searchParams, from: option.iata });
                          setFromInput(`${option.name} - ${option.iata}`);
                        }}
                        loading={fromLoading}
                        icon={"airplane-takeoff"}
                        inputStyle={styles.input}
                      />
                    </View>
                    <View>
                      <AutocompleteInput
                        options={toSuggestions}
                        inputLabel={"To"}
                        inputValue={toInput}
                        onInputChange={handleToInputChange}
                        onSelectOption={(option: any) => {
                          setSearchParams({ ...searchParams, to: option.iata });
                          setToInput(`${option.name} - ${option.iata}`);
                        }}
                        loading={toLoading}
                        icon={"airplane-landing"}
                        inputStyle={styles.input}
                      />
                    </View>
                  </View>
                  <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 35, right: 0, zIndex: 1, backgroundColor: theme.colors.disabled, borderRadius: 10, padding: 0, borderWidth: 1, borderColor: theme.colors.primaryGlass }}>
                    <IconButton
                      icon="swap-vertical"
                      size={24}
                      onPress={swapLocations}
                      style={{ marginTop: 0, marginBottom: 0, alignSelf: 'center' }}
                    />
                  </View>
              </View>
              {/* </View> */}

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{ width: '48%'}}>
                  <TextInput
                    label="Passengers"
                    value={searchParams.adults.toString()}
                    onChangeText={handleChange('adults')}
                    keyboardType="numeric"
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                  // textContentType='numeric'
                    mode='flat'
                  />
                </View>

                <View style={[styles.input, {width: '48%', marginTop: 0}]}>
                  <MenuDropdown
                    items={flightClasses}
                    selectedItem={searchParams.flightClass}
                    label="Select Flight Class"
                    type="flightClass"
                    handleChange={handleChange}
                    styles={{
                      marginTop: 55,
                      fontWeight: searchParams.flightClass ? 'bold' : 'normal',
                      fontSize: 16,
                    }}
                    icon='seat-passenger'
                  />
                </View>
              </View>

              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: '48%' }}>
                  <DatePickerInput
                    handleChange={handleChange}
                    placeholderText="Departure Date"
                    dateValue={searchParams.departureDate ? new Date(searchParams.departureDate).toDateString() : ""}
                    dateType='departureDate'
                  />
                </View>
                <View style={{ width: '48%' }}>
                  {
                    showReturnDate ? 
                    (
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                      <View style={{ flex: 1 }}>
                        <DatePickerInput
                          handleChange={handleChange}
                          placeholderText="Return Date"
                          dateValue={searchParams.returnDate ? new Date(searchParams.returnDate).toDateString() : ""}
                          dateType='returnDate'
                        />
                      </View>
                      <IconButton
                        style={{ 
                          position: 'absolute', 
                          right: -15, top: -15, zIndex: 1, 
                          borderRadius: 50, 
                          backgroundColor: theme.colors.errorContainer, 
                          width: 18, height: 18 
                        }}
                        icon="close"
                        size={14}
                        onPress={() => {
                          setShowReturnDate(false);
                          setTripType("oneWay");
                          setSearchParams({ ...searchParams, returnDate: null });
                        }}
                      />
                      </View>
                      ) : 
                      (<View style={{ padding: 0 }}>
                        <Pressable onPress={() => {
                            setShowReturnDate(true);
                            setTripType("roundTrip");
                        }}>
                            <Text style={{ fontSize: 16, color: theme.colors.error, textAlign: 'center' }}>
                              + Add Return Date
                            </Text>
                            <Text style={{ fontSize: 12, color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
                              (optional)
                            </Text>
                          </Pressable>
                      </View>)
                  }
                </View>
              </View>

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.searchButton}
                loading={offersLoading}
                disabled={offersLoading}
                labelStyle={{ color: theme.colors.text }}
              >
                {offersLoading ? "Searching" : "Search Flights"}
              </Button>
           </View>
          </View>
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 10,
    backgroundColor: theme.colors.transparent
  },
  button: {
    marginTop: 16,
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
});