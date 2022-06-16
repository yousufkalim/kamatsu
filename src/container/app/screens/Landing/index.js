import { View, Text, Image } from "react-native"
import Toast from "react-native-toast-message"
import React from "react"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen"

import LandingImage from "../../../../assets/images/png/landing.png"
import HaulageIcon from "../../../../assets/svg/haulage.svg"
import EquipmentSelectorTool from "../../../../assets/svg/equipment-selector-tool.svg"
import DozePro from "../../../../assets/svg/dozePro.svg"
import TrolleyFeasibillityTool from "../../../../assets/svg/trolley-feasibillity-tool.svg"
import LogoWhite from "../../../../assets/svg/logo-white.svg"
import { IconButton } from "../../../../components/IconButton"

import { styles } from "./styles"

const Landing = ({ navigation }) => {
  const showMsg = () => {
    Toast.show({
      type: "info",
      text1: "Coming Soon"
    })
  }

  return (
    <>
      <View style={styles.backgroundImg}>
        <Image source={LandingImage} alt="photo" style={styles.image}></Image>
        <View style={styles.overlay}>
          <View style={styles.logo}>
            <LogoWhite height={hp(5)} width={wp(80)} />
          </View>
          <Text style={styles.introText}>
            Harness the power {"\n"} of data to optimize {"\n"}
            your job site
          </Text>
          <Text style={styles.introDesc}>
            Creating value together with 21st century fleet studies and
            solutions
          </Text>
        </View>
      </View>

      <View style={styles.btns}>
        <IconButton
          btnText="Haulage Analysis Tool"
          BtnIcon={HaulageIcon}
          onPress={() => navigation.navigate("FleetDefinition")}
        />
        <IconButton
          btnText="Equipment Selector Tool"
          isDisabled
          BtnIcon={EquipmentSelectorTool}
          onPress={showMsg}
        />
        <IconButton
          btnText="DozePro"
          isDisabled
          BtnIcon={DozePro}
          onPress={showMsg}
        />
        <IconButton
          btnText="Trolley Feasibillity Tool"
          isDisabled
          BtnIcon={TrolleyFeasibillityTool}
          onPress={showMsg}
        />
      </View>
    </>
  )
}

export default Landing
