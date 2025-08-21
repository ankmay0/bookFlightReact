import { theme } from '@/themes/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerStyle: {
                backgroundColor: theme.colors.primary,
                                
            },
            headerTintColor: theme.colors.disabled,
            headerTitleStyle: {
                // fontFamily: 'Roboto',
                fontSize: 30,
                fontWeight: 'bold',
            },
            tabBarStyle: {
                backgroundColor: theme.colors.disabled,
                borderTopWidth: 0,
                elevation: 0,
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.tertiary,
        }}>
            <Tabs.Screen
                name="home/index"
                options={{
                    title: "FlightMate",
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={focused ? size + 6 : size }
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="offers/index"
                options={{
                    title: "Search Results",
                    // tabBarIcon: "airplane",
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons
                            name="airplane"
                            color={color}
                            size={focused ? size + 6 : size}
                        />
                    ),
                    headerLeft: ({ tintColor }) => (
                        <MaterialCommunityIcons
                            name="arrow-left"
                            color={tintColor}
                            size={24}
                            style={{ marginLeft: 10, marginRight: 20 }}
                            onPress={() => {router.push('./home')}}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search/index"
                options={{
                    title: "Search",
                    // tabBarIcon: "airplane",
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons 
                            name="magnify"
                            color={color} 
                            size={focused ? size + 6 : size}
                            style={{
                                // marginBottom: 50,
                                // borderWidth: 1,
                                // borderColor: focused ? theme.colors.transparent : 'transparent',
                                // backgroundColor: focused ? theme.colors.primaryGlass: 'transparent',
                                // borderRadius: 50,
                                // padding: focused ? 5 : 0,
                            }} 
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="account/index"
                options={{
                    title: "User Account",
                    // tabBarIcon: "information",
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons 
                            name="account" 
                            color={color} 
                            size={focused ? size + 6 : size} 
                        />
                    ), 
                }}
            />
            <Tabs.Screen
                name="about/index"
                options={{
                    title: "About",
                    // tabBarIcon: "information",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="information" color={color} size={size} />
                    ), 
                }}
            />
        </Tabs>
    )
}