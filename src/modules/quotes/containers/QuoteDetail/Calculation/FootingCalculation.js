let FootingCalculation = {
    pierOnly(InputData){
        let maxBaySize = 0;
        let buildingSpan = InputData.A / 1000;
        let windSpeed;
        let isNonCyclonic = true;
        let depth;
        let diam;

        if (InputData.bays) {
            for (var bayIndex = 0; bayIndex < InputData.bays.length; bayIndex++){
                if (maxBaySize < parseInt(InputData.bays[bayIndex].actualSize) / 1000){
                    maxBaySize = parseInt(InputData.bays[bayIndex].actualSize) / 1000;
                }
            }

        }

        if (InputData.Vzu) {
            windSpeed = InputData.Vzu;
        }

        if (maxBaySize <= 3) {
            if (buildingSpan <= 10) {
                diam = 300;
            } else {
                diam = 450;
            }
            if (windSpeed <= 33) {
                if (buildingSpan <= 8) {
                    depth = 700;
                } else if (buildingSpan <= 12) {
                    depth = 900;
                } else {
                    depth = 1000;
                }
            } else if (windSpeed <= 41) {
                if (buildingSpan <= 8) {
                    depth = 700;
                } else if (buildingSpan <= 12) {
                    depth = 900;
                } else {
                    depth = 1200;
                }
            } else if (windSpeed <= 50 && isNonCyclonic) {
                if (buildingSpan <= 6) {
                    depth = 800;
                } else if (buildingSpan <= 8) {
                    depth = 900;
                } else if (buildingSpan <= 12){
                    depth = 1000;
                } else {
                    depth = 1200;
                }
            } else if (windSpeed <= 50 && isNonCyclonic === false) {
                if (buildingSpan <= 6) {
                    depth = 800;
                } else if (buildingSpan <= 8) {
                    depth = 900;
                } else if (buildingSpan <= 12){
                    depth = 1000;
                } else {
                    depth = 1500;
                }
            } else {
                if (buildingSpan <= 6) {
                    depth = 900;
                } else if (buildingSpan <= 8) {
                    depth = 1000;
                } else if (buildingSpan <= 12){
                    depth = 1200;
                } else {
                    depth = 1800;
                }
            }
        } else if (maxBaySize <= 3.5) {
            if (buildingSpan <= 10) {
                diam = 300;
            } else if (buildingSpan <= 21) {
                diam = 450;
            } else {
                diam = 600;
            }

            if (windSpeed <= 33) {
                if (buildingSpan <= 6) {
                    depth = 700;
                } else if (buildingSpan <= 12) {
                    depth = 900;
                } else {
                    depth = 1000;
                }
            } else if (windSpeed <= 41) {
                if (buildingSpan <= 6) {
                    depth = 700;
                } else if (buildingSpan <= 12) {
                    depth = 900;
                } else if (buildingSpan <= 21){
                    depth = 1200;
                } else {
                    depth = 1500;
                }
            } else if (windSpeed <= 50 && isNonCyclonic) {
                if (buildingSpan <= 6) {
                    depth = 800;
                } else if (buildingSpan <= 8) {
                    depth = 900;
                } else if (buildingSpan <= 12){
                    depth = 1000;
                } else if (buildingSpan <= 21){
                    depth = 1200;
                } else {
                    depth = 1800;
                }
            } else if (windSpeed <= 50 && isNonCyclonic === false) {
                if (buildingSpan <= 6) {
                    depth = 800;
                } else if (buildingSpan <= 8) {
                    depth = 900;
                } else if (buildingSpan <= 12){
                    depth = 1000;
                } else if (buildingSpan <= 21){
                    depth = 1500;
                } else {
                    depth = 1800;
                }
            } else {
                if (buildingSpan <= 6) {
                    depth = 900;
                } else if (buildingSpan <= 8) {
                    depth = 1000;
                } else if (buildingSpan <= 12){
                    depth = 1200;
                } else {
                    depth = 1800;
                }
            }
        } else if (maxBaySize <= 4) {
            if (buildingSpan <= 8) {
                diam = 300;
            } else if (buildingSpan <= 18) {
                diam = 450;
            } else if (buildingSpan <= 21 && windSpeed <= 33) {
                diam = 450;
            } else {
                diam = 600;
            }

            if (windSpeed <= 33) {
                if (buildingSpan <= 12) {
                    depth = 900;
                } else if (buildingSpan <= 18) {
                    depth = 1000;
                } else {
                    depth = 1200;
                }
            } else if (windSpeed <= 41) {
                if (buildingSpan <= 10) {
                    depth = 900;
                } else if (buildingSpan <= 12) {
                    depth = 1000;
                } else if (buildingSpan <= 21){
                    depth = 1200;
                } else {
                    depth = 1500;
                }
            } else if (windSpeed <= 50) {
                if (buildingSpan <= 6) {
                    depth = 900;
                } else if (buildingSpan <= 9) {
                    depth = 1000;
                } else if (buildingSpan <= 10){
                    depth = 1100;
                } else if (buildingSpan <= 12){
                    depth = 1200;
                } else if (buildingSpan <= 21){
                    depth = 1500;
                } else {
                    depth = 1600;
                }
            } else {
                if (buildingSpan <= 5) {
                    depth = 900;
                } else if (buildingSpan <= 7) {
                    depth = 1000;
                } else if (buildingSpan <= 10){
                    depth = 1200;
                } else if (buildingSpan <= 12){
                    depth = 1500;
                } else {
                    depth = 1800;
                }
            }
        } else if (maxBaySize <= 4.5) {
            if (buildingSpan <= 8) {
                diam = 300;
            } else if (buildingSpan <= 18) {
                diam = 450;
            } else if (buildingSpan <= 21 && windSpeed <= 33) {
                diam = 450;
            } else {
                diam = 600;
            }

            if (windSpeed <= 33) {
                if (buildingSpan <= 12) {
                    depth = 900;
                } else if (buildingSpan <= 18) {
                    depth = 1000;
                } else {
                    depth = 1200;
                }
            } else if (windSpeed <= 41) {
                if (buildingSpan <= 10) {
                    depth = 900;
                } else if (buildingSpan <= 12) {
                    depth = 1000;
                } else if (buildingSpan <= 21){
                    depth = 1200;
                } else {
                    depth = 1500;
                }
            } else if (windSpeed <= 50) {
                if (buildingSpan <= 6) {
                    depth = 900;
                } else if (buildingSpan <= 9) {
                    depth = 1000;
                } else if (buildingSpan <= 10){
                    depth = 1100;
                } else if (buildingSpan <= 12){
                    depth = 1200;
                } else if (buildingSpan <= 21){
                    depth = 1500;
                } else {
                    depth = 1600;
                }
            } else {
                if (buildingSpan <= 4) {
                    depth = 900;
                } else if (buildingSpan <= 5) {
                    depth = 950;
                } else if (buildingSpan <= 6){
                    depth = 1000;
                } else if (buildingSpan <= 7){
                    depth = 1100;
                } else if (buildingSpan <= 9){
                    depth = 1200;
                } else if (buildingSpan <= 10){
                    depth = 1400;
                } else if (buildingSpan <= 12){
                    depth = 1500;
                } else {
                    depth = 1800;
                }
            }
        } else {
            if (buildingSpan <= 5) {
                diam = 300;
            } else if (buildingSpan <= 12) {
                diam = 450;
            } else if (buildingSpan <= 18 && windSpeed <= 33) {
                diam = 450;
            } else {
                diam = 600;
            }

            if (windSpeed <= 33) {
                if (buildingSpan <= 10) {
                    depth = 900;
                } else if (buildingSpan <= 12) {
                    depth = 1000;
                } else {
                    depth = 1200;
                }
            } else if (windSpeed <= 41) {
                if (buildingSpan <= 8) {
                    depth = 900;
                } else if (buildingSpan <= 9) {
                    depth = 1000;
                } else if (buildingSpan <= 10){
                    depth = 1100;
                } else if (buildingSpan <= 21){
                    depth = 1200;
                } else {
                    depth = 1500;
                }
            } else if (windSpeed <= 50) {
                if (buildingSpan <= 5) {
                    depth = 900;
                } else if (buildingSpan <= 8) {
                    depth = 1000;
                } else if (buildingSpan <= 9){
                    depth = 1200;
                } else if (buildingSpan <= 10){
                    depth = 1400;
                } else if (buildingSpan <= 18){
                    depth = 1500;
                } else if (buildingSpan <= 21){
                    depth = 1600;
                }else {
                    depth = 1800;
                }
            } else {
                if (buildingSpan <= 4) {
                    depth = 1000;
                } else if (buildingSpan <= 5) {
                    depth = 1100;
                } else if (buildingSpan <= 7){
                    depth = 1200;
                } else if (buildingSpan <= 8){
                    depth = 1300;
                } else if (buildingSpan <= 9){
                    depth = 1500;
                } else if (buildingSpan <= 10){
                    depth = 1600;
                } else if (buildingSpan <= 15){
                    depth = 1800;
                } else if (buildingSpan <= 21){
                    depth = 2000;
                } else {
                    depth = 2200;
                }
            }
        }

        if (InputData.footingsSoilType === 'H1') {
            return {
                diam: Math.max(diam, 400),
                depth: Math.max(depth, 1500)
            }
        } else {
            return {
                diam: diam,
                depth: depth
            }
        }
    }
}

export default FootingCalculation;