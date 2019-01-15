import React from "react";
import {
  Platform
} from "react-native";
import {
  Ionicons
} from "@expo/vector-icons";

import {
  StackNavigator,
  TabNavigator,
  SwitchNavigator
} from "react-navigation";

import Colors from "../constants/Colors";

import LanguageSelection from "../screens/LanguageSelection";
import SelectUserType from "../screens/SelectUserType";
import LocationSelection from "../screens/LocationSelection";
import SignUpScreen from "../screens/SignUpScreen";
import LogInScreen from "../screens/LogInScreen";
import HomeScreen from "../screens/HomeScreen";
import VenueScreen from "../screens/VenueScreen";
import SearchScreen from "../screens/SearchScreen";
import ReservationScreen from "../screens/ReservationScreen";
import VenueListScreen from "../screens/VenueListScreen";
import AddServicesScreen from "../screens/AddServicesScreen";
import FavouriteScreen from "../screens/FavouriteScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegStepThree from "../screens/RegStepThree";
import Notifications from "../screens/Notifications";
import VenueNotifications from "../screens/VenueNotifications";
import RegStepTwo from "../screens/RegStepTwo";
import RegStepOne from "../screens/RegStepOne";
import VenueHome from "../screens/VenueHome";
import VenueBooking from "../screens/VenueBooking";
import CheckoutScreen from "../screens/CheckoutScreen";
import ServicesScreen from "../screens/ServicesScreen";
import OwnerSettings from "../screens/OwnerSettings";
import GoogleWebView from "../screens/GoogleWebView";
import GenderScreen from "../screens/SelectGenderScreen";
import {
  Tab
} from "native-base";

const SignedInBusinessOwner = TabNavigator({
  VenueHome: {
    screen: VenueHome
  },
  VenueBooking: {
    screen: VenueBooking
  },
  VenueNotifications: {
    screen: VenueNotifications
  },
  OwnerProfile: {
    screen: OwnerSettings
  },
  businessRegistrationNavigation: {
    screen: TabNavigator({
      RegStep3: {
        screen: RegStepThree
      },
      RegStep2: {
        screen: RegStepTwo
      },
      RegStep1: {
        screen: RegStepOne
      },
    }, {
      navigationOptions: {
        tabBarVisible: false,
        animationEnabled: false,
        lazy: false,
        swipeEnabled: false
      }
    })
  },
  VenueServices: {
    screen: ServicesScreen
  }
}, {
  navigationOptions: {
    tabBarVisible: false,
    animationEnabled: false,
    swipeEnabled: false
  }
})

// const venueListNavigation = StackNavigator(
//   {
//     Venues: {
//       screen: VenueListScreen
//     },
//     Service: {
//       screen: VenueScreen
//     },
//     AddService: {
//       screen: AddServicesScreen
//     },
//     Checkout: {
//       screen: CheckoutScreen
//     }
//   }
// );

const SignedInCustomer = TabNavigator({
  GenderAndLocation: StackNavigator({
    Location: {
      screen: LocationSelection
    },
    GenderScreen: {
      screen: GenderScreen,
    },
  }),
  Home: {
    screen: HomeScreen
  },
  Search: {
    screen: SearchScreen
  },
  Reservation: {
    screen: ReservationScreen
  },
  Favourite: {
    screen: FavouriteScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Notifications: {
    screen: Notifications
  },
  VenueList: StackNavigator({
    Venues: {
      screen: VenueListScreen
    },
    Service: {
      screen: VenueScreen
    },
    AddService: {
      screen: AddServicesScreen
    },
    Checkout: {
      screen: CheckoutScreen
    }
  }),

}, {
  navigationOptions: {
    tabBarVisible: false,
    animationEnabled: false,
    swipeEnabled: false
  }
})

export const SignedOutUser = StackNavigator({
  Language: {
    screen: LanguageSelection
  },
  LocationNoUser: {
    screen: LocationSelection
  },
  GenderScreenNoUser: {
    screen: GenderScreen,
  },
  UserType: {
    screen: SelectUserType
  },
  SignUp: {
    screen: SignUpScreen
  },
  LogIn: {
    screen: LogInScreen
  },
}, {
  initialRouteName: "Language"
});

const test = StackNavigator({
  // Navigator: { screen: NavigatorScreen },
  Language: {
    screen: LanguageSelection
  },
  Location: {
    screen: LocationSelection
  },
  UserType: {
    screen: SelectUserType
  },
  SignUp: {
    screen: SignUpScreen
  },
  LogIn: {
    screen: LogInScreen
  },
  Checkout: {
    screen: CheckoutScreen
  },
  // Generic: { screen: GenericHolder },
  // VenueList: { screen: VenueListScreen },
  // Reservation: { screen: ReservationScreen },
  // Search: { screen: SearchScreen },
  HomeNavigation: {
    screen: TabNavigator({
      Home: {
        screen: HomeScreen
      },
      Search: {
        screen: SearchScreen
      },
      Reservation: {
        screen: ReservationScreen
      },
      Favourite: {
        screen: FavouriteScreen
      },
      Profile: {
        screen: ProfileScreen
      },
      Notifications: {
        screen: Notifications
      },

      VenueList: {
        screen: StackNavigator({
          Venues: {
            screen: VenueListScreen
          },
          Service: {
            screen: VenueScreen
          },
          AddService: {
            screen: AddServicesScreen
          },
          Checkout: {
            screen: CheckoutScreen
          }
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false,
        animationEnabled: false,
        swipeEnabled: false
      }
    })
  },
  VenueNavigation: {
    screen: TabNavigator({
      RegStep3: {
        screen: RegStepThree
      },
      RegStep2: {
        screen: RegStepTwo
      },
      RegStep1: {
        screen: RegStepOne
      },
      VenueHome: {
        screen: VenueHome
      },
      VenueBooking: {
        screen: VenueBooking
      },
      VenueNotifications: {
        screen: VenueNotifications
      },
      Profile: {
        screen: ProfileScreen
      }
    }, {
      navigationOptions: {
        tabBarVisible: false,
        animationEnabled: false,
        lazy: false,
        swipeEnabled: false
      }
    })
  }

  // 'Third Screen': { screen: ThirdScreen },
  // 'Second Screen': { screen: SecondScreen },
  // 'Main Screen': { screen: MainScreen },
}, {
  initialRouteName: "Language"
  // initialRouteName: "HomeNavigation"
  // initialRouteName: "VenueNavigation"
});


export default createRootNavigator = (signedIn = false, userType) => {
  return SwitchNavigator({
    signedInBusinessOwner: {
      screen: SignedInBusinessOwner
    },
    signedInCustomer: {
      screen: SignedInCustomer
    },
    signedOut: {
      screen: SignedOutUser
    },
    GoogleWebView: {
      screen: GoogleWebView
    },
    GoToVenue: {
      screen: VenueScreen
    }
  }, {
    initialRouteName: signedIn && userType === 'businessOwner' ? "signedInBusinessOwner" : signedIn && userType === 'user' ? "signedInCustomer" : "signedOut"
  })
}