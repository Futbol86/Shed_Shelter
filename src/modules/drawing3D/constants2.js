export const BRACKET_SAMPLES = [
    { id: 1, code: "APEX-PLATE", name: "APEX PLATE" },
    { id: 2, code: "KNEE-PLATE-CARPORT-GABLE", name: "KNEE PLATE CARPORT GABLE" },
    { id: 3, code: "KNEE-PLATE-CARPORT-SKILLION", name: "KNEE PLATE CARPORT SKILLION" },
    { id: 4, code: "KNEE-PLATE-FRAME-TOPHAT", name: "KNEE PLATE FRAME TOPHAT" },
    { id: 5, code: "KNEE-PLATE-FRAME-ZSECTION", name: "KNEE PLATE FRAME ZSECTION" },
    { id: 6, code: "KNEE-PLATE-ROLLER-DOOR-TOPHAT", name: "KNEE PLATE ROLLER DOOR TOPHAT" },
    { id: 7, code: "KNEE-PLATE-ROLLER-DOOR-ZSECTION", name: "KNEE PLATE ROLLER DOOR ZSECTION" },
    { id: 8, code: "LATERAL-KNEE-BRACE", name: "LATERAL KNEE BRACE" },
    { id: 9, code: "OTHER-BRACKET", name: "OTHER BRACKET" },
];

export const APEX_PLATE_SAMPLES = {
    "NSZAP-100-030": {
        type: "NSZAP",
        panel: { W0: 549, H0: 20, H1: 54, H2: (30 + 40 + 32), H3: (190 - (20 + 54)), angle: Math.PI/60, thickness: 5 },
        holes: { W01: 35, W02: 100, H01: 32, H02: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-400-030": {
        type: "NSZAP",
        panel: { W0: 1049, H0: 30, H1: 128, H2: 400, H3: (586 - (30 + 128)), angle: Math.PI/60, thickness: 5 },
        holes: { holeNum: 4, W01: 35, W02: 150, H01: 45, H02: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-350-050": {
        type: "NSZAP",
        panel: { W0: 1046, H0: 30, H1: 128, H2: 350, H3: 399, angle: Math.PI/36, thickness: 5 },
        holes: { holeNum: 4, W01: 35, W02: 150, H01: 45, H02: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-100-075": {
        type: "NSZAP",
        panel: { W0: 544, H0: 20, H1: 54, H2: 102, H3: 213 - (20 + 54), angle: Math.PI/24, thickness: 5 },
        holes: { holeNum: 3, W01: 35, W02: 100, H01: 32, H02: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-300-100": {
        type: "NSZAP",
        panel: { W0: 739, H0: 30, H1: 98, H2: 300, H3: 498 - (30 + 98), angle: Math.PI/18, thickness: 5 },
        holes: { holeNum: 3, W01: 35, W02: 150, H01: 45, H02: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-400-125": {
        type: "NSZAP",
        panel: { W0: 1025, H0: 30, H1: 128, H2: 400, H3: 681 - (30 + 128), angle: Math.PI/14.4, thickness: 5 },
        holes: { holeNum: 4, W01: 35, W02: 150, H01: 45, H02: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-100-150": {
        type: "NSZAP",
        panel: { W0: 532, H0: 20, H1: 54, H2: 102, H3: 251 - (20 + 54), angle: Math.PI/12, thickness: 5 },
        holes: { holeNum: 3, W01: 35, W02: 100, H01: 32, H02: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-400-200": {
        type: "NSZAP",
        panel: { W0: 987, H0: 30, H1: 128, H2: 400, H3: 605, angle: Math.PI/9, thickness: 5 },
        holes: { holeNum: 4, W01: 35, W02: 150, H01: 45, H02: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-150-225": {
        type: "NSZAP",
        panel: { W0: 509, H0: 30, H1: 67, H2: 152, H3: 367 - (30 + 67), angle: Math.PI/8, thickness: 5 },
        holes: { holeNum: 3, W01: 35, W02: 100, H01: 47, H02: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-400-250": {
        type: "NSZAP",
        panel: { W0: 953, H0: 30, H1: 128, H2: 400, H3: 821 - (30 + 128), angle: Math.PI/7.2, thickness: 5 },
        holes: { holeNum: 4, W01: 35, W02: 150, H01: 45, H02: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZAP-100-300": {
        type: "NSZAP",
        panel: { W0: 478, H0: 20, H1: 54, H2: 102, H3: 330 - (20 + 54), angle: Math.PI/6, thickness: 5 },
        holes: { holeNum: 3, W01: 35, W02: 100, H01: 32, H02: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTAP-100-050": {
        type: "NSZAP",
        panel: { W0: 548, H0: 20, H1: 54, H2: 102, H3: 200 - (20 + 54), angle: Math.PI/36, thickness: 5 },
        holes: { holeNum: 3, W01: 35, W02: 100, H01: 32, H02: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTAP-350-075": {
        type: "NSZAP",
        panel: { W0: 1041, H0: 30, H1: 128, H2: 350, H3: 580 - (30 + 128), angle: Math.PI/24, thickness: 5 },
        holes: { holeNum: 4, W01: 35, W02: 150, H01: 45, H02: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTAP-400-100": {
        type: "NSZAP",
        panel: { W0: 1034, H0: 30, H1: 128, H2: 400, H3: 655 - (30 + 128), angle: Math.PI/18, thickness: 5 },
        holes: { holeNum: 4, W01: 35, W02: 150, H01: 45, H02: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTAP-150-125": {
        type: "NSZAP",
        panel: { W0: 537, H0: 30, H1: 67, H2: 152, H3: 312 - (30 + 67), angle: Math.PI/14.4, thickness: 5 },
        holes: { holeNum: 3, W01: 35, W02: 100, H01: 47, H02: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTAP-400-150": {
        type: "NSZAP",
        panel: { W0: 1014, H0: 30, H1: 127, H2: 400, H3: 705 - (30 + 127), angle: Math.PI/12, thickness: 5 },
        holes: { holeNum: 4, W01: 35, W02: 150, H01: 45, H02: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTAP-100-200": {
        type: "NSZAP",
        panel: {  W0: 517, H0: 20, H1: 54, H2: 102, H3: 277 - (20 + 54), angle: Math.PI/9, thickness: 5 },
        holes: { holeNum: 3, W01: 35, W02: 100, H01: 32, H02: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTAP-350-225": {
        type: "NSZAP",
        panel: { W0: 971, H0: 30, H1: 128, H2: 350, H3: 738 - (30 + 128), angle: Math.PI/8, thickness: 5 },
        holes: { holeNum: 4, W01: 35, W02: 150, H01: 45, H02: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTAP-150-250": {
        type: "NSZAP",
        panel: { W0: 499, H0: 30, H1: 67, H2: 152, H3: 381 - (30 + 67), angle: Math.PI/7.2, thickness: 5 },
        holes: { holeNum: 3, W01: 35, W02: 100, H01: 47, H02: 60, radiusX: 16/2, radiusY: 16/2 }
    },
}

export const KNEE_PLATE_CARPORT_GABLE_SAMPLES = {
    "NSCKP-2510-030-LH": {
        type: "NSCKP",
        panel: { W0: (202 - 100), W1: 370, W2: 100, W3: 75, H0: 624, H1: 10, H2: 254, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 160, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2510-030-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (202 - 100), W1: 370, W2: 100, W3: 75, H0: 624, H1: 10, H2: 254, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 160, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-4010-030-LH": {
        type: "NSCKP",
        panel: { W0: (202 - 100), W1: 520, W2: 100, W3: 125, H0: 920, H1: 10, H2: 400, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-4010-030-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (202 - 100), W1: 520, W2: 100, W3: 125, H0: 920, H1: 10, H2: 400, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1010-050-LH": {
        type: "NSCKP",
        panel: { W0: (203 - 100), W1: (369 - 100)/Math.cos(Math.PI/36), W2: 100, W3: 50, H0: 372, H1: 10, H2: 102, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: {  holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1010-050-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: (369 - 100)/Math.cos(Math.PI/36), W2: 100, W3: 50, H0: 372, H1: 10, H2: 102, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: {  holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-3510-050-LH": {
        type: "NSCKP",
        panel: { W0: (203 - 100), W1: (618 - 100)/Math.cos(Math.PI/36), W2: 100, W3: 125, H0: 869, H1: 10, H2: 350, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-3510-050-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: (618 - 100)/Math.cos(Math.PI/36), W2: 100, W3: 125, H0: 869, H1: 10, H2: 350, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-4010-075-LH": {
        type: "NSCKP",
        panel: { W0: (202 - 100), W1: (616 - 100)/Math.cos(Math.PI/24), W2: 100, W3: 125, H0: 917, H1: 10, H2: 400, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-4010-075-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (202 - 100), W1: (616 - 100)/Math.cos(Math.PI/24), W2: 100, W3: 125, H0: 917, H1: 10, H2: 400, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2010-100-LH": {
        type: "NSCKP",
        panel: { W0: (202 - 100), W1: (366 - 100)/Math.cos(Math.PI/18), W2: 100, W3: 75, H0: 470, H1: 10, H2: 203, H3: 100, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 45, H22: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2010-100-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (202 - 100), W1: (366 - 100)/Math.cos(Math.PI/18), W2: 100, W3: 75, H0: 470, H1: 10, H2: 203, H3: 100, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 45, H22: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-3510-125-LH": {
        type: "NSCKP",
        panel: { W0: (202 - 100), W1: (608 - 100)/Math.cos(Math.PI/14.4), W2: 100, W3: 125, H0: 864, H1: 10, H2: 350, H3: 125, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-3510-125-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (202 - 100), W1: (608 - 100)/Math.cos(Math.PI/14.4), W2: 100, W3: 125, H0: 864, H1: 10, H2: 350, H3: 125, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1010-150-LH": {
        type: "NSCKP",
        panel: { W0: (203 - 100), W1: (361 - 100)/Math.cos(Math.PI/12), W2: 100, W3: 50, H0: 369, H1: 10, H2: 102, H3: 100, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1010-150-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: (361 - 100)/Math.cos(Math.PI/12), W2: 100, W3: 50, H0: 369, H1: 10, H2: 102, H3: 100, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2010-200-LH": {
        type: "NSCKP",
        panel: { W0: (202 - 100), W1: (353 - 100)/Math.cos(Math.PI/9), W2: 100, W3: 75, H0: 461, H1: 10, H2: 203, H3: 100, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 45, H22: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2010-200-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (202 - 100), W1: (353 - 100)/Math.cos(Math.PI/9), W2: 100, W3: 75, H0: 461, H1: 10, H2: 203, H3: 100, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 45, H22: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1010-225-LH": {
        type: "NSCKP",
        panel: { W0: (203 - 100), W1: (349 - 100)/Math.cos(Math.PI/8), W2: 100, W3: 50, H0: 364, H1: 10, H2: 102, H3: 100, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1010-225-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: (349 - 100)/Math.cos(Math.PI/8), W2: 100, W3: 50, H0: 364, H1: 10, H2: 102, H3: 100, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-4010-250-LH": {
        type: "NSCKP",
        panel: { W0: (202 - 100), W1: (571 - 100)/Math.cos(Math.PI/7.2), W2: 100, W3: 125, H0: 882, H1: 10, H2: 400, H3: 100, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-4010-250-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (202 - 100), W1: (571 - 100)/Math.cos(Math.PI/7.2), W2: 100, W3: 125, H0: 882, H1: 10, H2: 400, H3: 100, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 45, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1010-300-LH": {
        type: "NSCKP",
        panel: { W0: (203 - 100), W1: (334 - 100)/Math.cos(Math.PI/6), W2: 100, W3: 50, H0: 358, H1: 10, H2: 102, H3: 100, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1010-300-RH": {
        type: "NSCKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: (334 - 100)/Math.cos(Math.PI/6), W2: 100, W3: 50, H0: 358, H1: 10, H2: 102, H3: 100, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-030-LH": {
        type: "NSKP",
        panel: { W0: (203 - 100), W1: (365.9 - 100), W2: 100, W3: 50, H0: 440, H1: 0, H2: 147, H3: 100, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 75, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-030-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: (365.9 - 100), W2: 100, W3: 50, H0: 440, H1: 0, H2: 147, H3: 100, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 75, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-4010-030-LH": {
        type: "NSKP",
        panel: { W0: (202 - 100), W1: (618 - 100), W2: 100, W3: 125, H0: 980, H1: 0, H2: 423, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 68, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-4010-030-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (202 - 100), W1: (618 - 100), W2: 100, W3: 125, H0: 980, H1: 0, H2: 423, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H21: 68, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-15125-030-LH": {
        type: "NSKP",
        panel: {  W0: (251 - 125), W1: (393 - 125), W2: 125, W3: 65, H0: 489, H1: 0, H2: 195, H3: 100, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, W21: 63, H01: 35, H02: 100, H03: 60, H04: 116, H21: 88, H22: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-15125-030-RH": {
        type: "NSKP",
        direction: "RH",
        panel: {  W0: (251 - 125), W1: (393 - 125), W2: 125, W3: 65, H0: 489, H1: 0, H2: 195, H3: 100, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, W21: 63, H01: 35, H02: 100, H03: 60, H04: 116, H21: 88, H22: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-40125-030-LH": {
        type: "NSKP",
        panel: { W0: (252 - 125), W1: 518, W2: 125, W3: 125, H0: 980, H1: 0, H2: 423, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 60, H04: 110, H21: 68, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-40125-030-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (252 - 125), W1: 518, W2: 125, W3: 125, H0: 980, H1: 0, H2: 423, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 60, H04: 110, H21: 68, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-050-LH": {
        type: "NSKP",
        panel: { W0: (203 - 100), W1: (366 - 100), W2: 100, W3: 50, H0: 440, H1: 0, H2: 137, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: (35 + 30), H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-050-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: (366 - 100), W2: 100, W3: 50, H0: 440, H1: 0, H2: 137, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: (35 + 30), H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-3010-050-LH": {
        type: "NSKP",
        panel: { W0: (203 - 100), W1: (466 - 100), W2: 100, W3: 95, H0: 736, H1: 0, H2: 325, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H21: 70, H22: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-3010-050-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: (466 - 100), W2: 100, W3: 95, H0: 736, H1: 0, H2: 325, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H21: 70, H22: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-25125-050-LH": {
        type: "NSKP",
        panel: { W0: (253 - 125), W1: (492 - 125), W2: 125, W3: 75, H0: 686, H1: 0, H2: 275, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, W21: 62, H01: 35, H02: 150, H03: 60, H04: 118, H21: 67, H22: 160, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-25125-050-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (253 - 125), W1: (492 - 125), W2: 125, W3: 75, H0: 686, H1: 0, H2: 275, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, W21: 62, H01: 35, H02: 150, H03: 60, H04: 118, H21: 67, H22: 160, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-4010-075-LH": {
        type: "NSKP",
        panel: {  W0: (202 - 100), W1: (615 - 100), W2: 100, W3: 125, H0: 980, H1: 0, H2: 405, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, W21: 50, H01: 35, H02: 150, H03: 60, H04: 123, H21: 50, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-4010-075-RH": {
        type: "NSKP",
        direction: "RH",
        panel: {  W0: (202 - 100), W1: (615 - 100), W2: 100, W3: 125, H0: 980, H1: 0, H2: 405, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, W21: 50, H01: 35, H02: 150, H03: 60, H04: 123, H21: 50, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-40125-075-LH": {
        type: "NSKP",
        panel: { W0: (252 - 125), W1: 515, W2: 125, W3: 125, H0: 980, H1: 0, H2: 405, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 60, H04: 123, H21: 50, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-40125-075-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (252 - 125), W1: 515, W2: 125, W3: 125, H0: 980, H1: 0, H2: 405, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 60, H04: 123, H21: 50, H22: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-100-LH": {
        type: "NSKP",
        panel: { W0: (203 - 100), W1: (365 - 100), W2: 100, W3: 50, H0: 432, H1: 0, H2: 106, H3: 100, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 34, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-100-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: (365 - 100), W2: 100, W3: 50, H0: 432, H1: 0, H2: 106, H3: 100, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 34, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-10125-100-LH": {
        type: "NSKP",
        panel: { W0: (253 - 125), W1: (390 - 125), W2: 125, W3: 50, H0: 432, H1: 0, H2: 106, H3: 100, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 34, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-10125-100-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (253 - 125), W1: (390 - 125), W2: 125, W3: 50, H0: 432, H1: 0, H2: 106, H3: 100, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 34, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-3510-125-LH": {
        type: "NSKP",
        panel: { W0: (202 - 100), W1: (608 - 100), W2: 100, W3: 125, H0: 943, H1: 44, H2: 350, H3: 100, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, W21: 50, H01: 35, H02: 150, H03: 60, H04: 109, H21: 45, H22: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-3510-125-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (202 - 100), W1: (608 - 100), W2: 100, W3: 125, H0: 943, H1: 44, H2: 350, H3: 100, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, W21: 50, H01: 35, H02: 150, H03: 60, H04: 109, H21: 45, H22: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-150-LH": {
        type: "NSKP",
        panel: { W0: (203 - 100), W1: 261, W2: 100, W3: 50, H0: 425, H1: 23, H2: 102, H3: 100, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-150-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: (203 - 100), W1: 261, W2: 100, W3: 50, H0: 425, H1: 23, H2: 102, H3: 100, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-20125-200-LH": {
        type: "NSKP",
        panel: { W0: 127, W1: 253, W2: 125, W3: 75, H0: 514, H1: 50, H2: 203, H3: 100, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, W21: 63, H01: 35, H02: 100, H03: 60, H04: (514 - 35 - 2*100 - 79 - 60), H21: 45, H22: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-20125-200-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: 127, W1: 253, W2: 125, W3: 75, H0: 514, H1: 50, H2: 203, H3: 100, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, W21: 63, H01: 35, H02: 100, H03: 60, H04: (514 - 35 - 2*100 - 79 - 60), H21: 45, H22: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1510-225-LH": {
        type: "NSKP",
        panel: {  W0: 102, W1: 249, W2: 100, W3: 65, H0: 462, H1: 63, H2: 153, H3: 100, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, W21: 50, H01: 35, H02: 100, H03: 60, H04: (462 - 35 - 2*100 - 25 - 60), H21: 45, H22: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1510-225-RH": {
        type: "NSKP",
        direction: "RH",
        panel: {  W0: 102, W1: 249, W2: 100, W3: 65, H0: 462, H1: 63, H2: 153, H3: 100, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, W21: 50, H01: 35, H02: 100, H03: 60, H04: (462 - 35 - 2*100 - 25 - 60), H21: 45, H22: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-30125-250-LH": {
        type: "NSKP",
        panel: { W0: 127, W1: 335, W2: 125, W3: 95, H0: 691, H1: 118, H2: 300, H3: 100, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 60, H04: (691 - 35 - 3*150 - 60), H21: 45, H22: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-30125-250-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: 127, W1: 335, W2: 125, W3: 95, H0: 691, H1: 118, H2: 300, H3: 100, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 60, H04: (691 - 35 - 3*150 - 60), H21: 45, H22: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-300-LH": {
        type: "NSKP",
        panel: { W0: 103, W1: 234, W2: 100, W3: 50, H0: 404, H1: 100, H2: 102, H3: 100, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1010-300-RH": {
        type: "NSKP",
        direction: "RH",
        panel: { W0: 103, W1: 234, W2: 100, W3: 50, H0: 404, H1: 100, H2: 102, H3: 100, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H21: 30, H22: 40, radiusX: 16/2, radiusY: 16/2 }
    },
};

export const KNEE_PLATE_CARPORT_SKILLION_SAMPLES = {
    "NSCKP-1510-030-LH": {
        type: "NSCKP_SKILLION",
        panel: { W0: 100, W1: 270, W2: 65, W3: 65, H0: 432, H1: 152, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1510-030-RH": {
        type: "NSCKP_SKILLION",
        direction: "RH",
        panel: { W0: 100, W1: 270, W2: 65, W3: 65, H0: 432, H1: 152, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-35125-030-LH": {
        type: "NSCKP_SKILLION",
        panel: { W0: (246 - 120), W1: 520, W2: 120, W3: 120, H0: 880, H1: 350, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-35125-030-RH": {
        type: "NSCKP_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: 520, W2: 120, W3: 120, H0: 880, H1: 350, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1510-050-LH": {
        type: "NSCKP_SKILLION",
        panel: { W0: (166 - 65), W1: 270, W2: 65, W3: 65, H0: 432, H1: 153, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1510-050-RH": {
        type: "NSCKP_SKILLION",
        direction: "RH",
        panel: { W0: (166 - 65), W1: 270, W2: 65, W3: 65, H0: 432, H1: 153, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-40125-050-LH": {
        type: "NSCKP_SKILLION",
        panel: { W0: (246 - 120), W1: 520, W2: 120, W3: 120, H0: 928, H1: 400, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-40125-050-RH": {
        type: "NSCKP_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: 520, W2: 120, W3: 120, H0: 928, H1: 400, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2510-075-LH": {
        type: "NSCKP_SKILLION",
        panel: { W0: (176 - 75), W1: 370, W2: 75, W3: 75, H0: 632, H1: 254, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 160, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2510-075-RH": {
        type: "NSCKP_SKILLION",
        direction: "RH",
        panel: { W0: (176 - 75), W1: 370, W2: 75, W3: 75, H0: 632, H1: 254, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 160, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-30125-075-LH": {
        type: "NSCKP_SKILLION",
        panel: { W0: (216 - 90), W1: 370, W2: 90, W3: 90, H0: 675, H1: 300, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-30125-075-RH": {
        type: "NSCKP_SKILLION",
        direction: "RH",
        panel: { W0: (216 - 90), W1: 370, W2: 90, W3: 90, H0: 675, H1: 300, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2010-100-LH": {
        type: "NSCKP_SKILLION",
        panel: { W0: (176 - 75), W1: 270, W2: 75, W3: 75, H0: (35 + 2*100 + 245), H1: 203, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2  }
    },
    "NSCKP-2010-100-RH": {
        type: "NSCKP_SKILLION",
        direction: "RH",
        panel: { W0: (176 - 75), W1: 270, W2: 75, W3: 75, H0: (35 + 2*100 + 245), H1: 203, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2  }
    },
    "NSCKP-40125-100-LH": {
        type: "NSCKP_SKILLION",
        panel: { W0: (246 - 120), W1: 520, W2: 120, W3: 120, H0: 1014, H1: 400, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-40125-100-RH": {
        type: "NSCKP_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: 520, W2: 120, W3: 120, H0: 1014, H1: 400, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSCKP-1510-030 DEC/LH": {
        type: "NSCKP_DEC_SKILLION",
        panel: { W0: 100, W1: 278, W2: 65, W3: 65, H0: 437, H1: 152, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-1510-030 DEC/RH": {
        type: "NSCKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: 100, W1: 278, W2: 65, W3: 65, H0: 437, H1: 152, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-4010-030 DEC/LH": {
        type: "NSCKP_DEC_SKILLION",
        panel: { W0: (201 - 100), W1: 538, W2: 100, W3: 100, H0: 936, H1: 400, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-4010-030 DEC/RH": {
        type: "NSCKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (201 - 100), W1: 538, W2: 100, W3: 100, H0: 936, H1: 400, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-40125-030 DEC/LH": {
        type: "NSCKP_DEC_SKILLION",
        panel: { W0: (246 - 120), W1: 538, W2: 120, W3: 120, H0: 937, H1: 400, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-40125-030 DEC/RH": {
        type: "NSCKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: 538, W2: 120, W3: 120, H0: 937, H1: 400, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2010-050 DEC/LH": {
        type: "NSCKP_DEC_SKILLION",
        panel: { W0: 101, W1: 287/Math.cos(Math.PI/36), W2: 75, W3: 75, H0: 493, H1: 203, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-2010-050 DEC/RH": {
        type: "NSCKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: 101, W1: 287/Math.cos(Math.PI/36), W2: 75, W3: 75, H0: 493, H1: 203, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-40125-050 DEC/LH": {
        type: "NSCKP_DEC_SKILLION",
        panel: { W0: (245 - 120), W1: 555, W2: 120, W3: 120, H0: 942, H1: 400, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-40125-050 DEC/RH": {
        type: "NSCKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (245 - 120), W1: 555, W2: 120, W3: 120, H0: 942, H1: 400, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-3010-075 DEC/LH": {
        type: "NSCKP_DEC_SKILLION",
        panel: { W0: (191 - 90), W1: 409, W2: 90, W3: 90, H0: 696, H1: 300, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-3010-075 DEC/RH": {
        type: "NSCKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (191 - 90), W1: 409, W2: 90, W3: 90, H0: 696, H1: 300, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-35125-075 DEC/LH": {
        type: "NSCKP_DEC_SKILLION",
        panel: { W0: (246 - 120), W1: 566, W2: 120, W3: 120, H0: 899, H1: 350, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-35125-075 DEC/RH": {
        type: "NSCKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: 566, W2: 120, W3: 120, H0: 899, H1: 350, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-3010-100 DEC/LH": {
        type: "NSCKP_DEC_SKILLION",
        panel: { W0: (191 - 90), W1: 423, W2: 90, W3: 90, H0: 702, H1: 300, angle: Math.PI/18, thickness: 10 },
        holes: {  holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSCKP-3010-100 DEC/RH": {
        type: "NSCKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (191 - 90), W1: 423, W2: 90, W3: 90, H0: 702, H1: 300, angle: Math.PI/18, thickness: 10 },
        holes: {  holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSKP-1510-030-LH": {
        type: "NSKP_SKILLION",
        panel: { W0: 100, W1: (332 - 65), W2: 65, W3: 65, H0: 492, H1: 198, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 91, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1510-030-RH": {
        type: "NSKP_SKILLION",
        direction: "RH",
        panel: { W0: 100, W1: (332 - 65), W2: 65, W3: 65, H0: 492, H1: 198, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 91, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-40125-030-LH": {
        type: "NSKP_SKILLION",
        panel: { W0: (246 - 120), W1: (638 - 120), W2: 120, W3: 120, H0: 990, H1: 433, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 78, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-40125-030-RH": {
        type: "NSKP_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: (638 - 120), W2: 120, W3: 120, H0: 990, H1: 433, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 78, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-2510-050-LH": {
        type: "NSKP_SKILLION",
        panel: { W0: (176 - 75), W1: (441 - 75), W2: 75, W3: 75, H0: 693, H1: 282, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 73, H12: 160, radiusX: 16/2, radiusY: 16/2  }
    },
    "NSKP-2510-050-RH": {
        type: "NSKP_SKILLION",
        direction: "RH",
        panel: { W0: (176 - 75), W1: (441 - 75), W2: 75, W3: 75, H0: 693, H1: 282, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 73, H12: 160, radiusX: 16/2, radiusY: 16/2  }
    },
    "NSKP-40125-050-LH": {
        type: "NSKP_SKILLION",
        panel: { W0: (246 - 120), W1: (637 - 120), W2: 120, W3: 120, H0: 989, H1: 415, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 60, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-40125-050-RH": {
        type: "NSKP_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: (637 - 120), W2: 120, W3: 120, H0: 989, H1: 415, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 60, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-2010-075-LH": {
        type: "NSKP_SKILLION",
        panel: { W0: (176 - 75), W1: (339 - 75), W2: 75, W3: 75, H0: 542, H1: 228, angle: Math.PI/24, thickness: 10 },
        holes: {  holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 70, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-2010-075-RH": {
        type: "NSKP_SKILLION",
        direction: "RH",
        panel: { W0: (176 - 75), W1: (339 - 75), W2: 75, W3: 75, H0: 542, H1: 228, angle: Math.PI/24, thickness: 10 },
        holes: {  holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 70, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-35125-075-LH": {
        type: "NSKP_SKILLION",
        panel: { W0: (246 - 120), W1: (636 - 120), W2: 120, W3: 120, H0: 945, H1: 350, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-35125-075-RH": {
        type: "NSKP_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: (636 - 120), W2: 120, W3: 120, H0: 945, H1: 350, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-2010-100-LH": {
        type: "NSKP_SKILLION",
        panel: { W0: (176 - 75), W1: (338 - 75), W2: 75, W3: 75, H0: 541, H1: 217, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 59, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-2010-100-RH": {
        type: "NSKP_SKILLION",
        direction: "RH",
        panel: { W0: (176 - 75), W1: (338 - 75), W2: 75, W3: 75, H0: 541, H1: 217, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 59, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-35125-100-LH": {
        type: "NSKP_SKILLION",
        panel: { W0: (246 - 120), W1: (632 - 120), W2: 120, W3: 120, H0: 965, H1: 350, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-35125-100-RH": {
        type: "NSKP_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: (632 - 120), W2: 120, W3: 120, H0: 965, H1: 350, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSKP-1510-030 DEC/LH": {
        type: "NSKP_DEC_SKILLION",
        panel: { W0: 100, W1: 288, W2: 65, W3: 65, W4: 343, H0: 498, H1: 152, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1510-030 DEC/RH": {
        type: "NSKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: 100, W1: 288, W2: 65, W3: 65, W4: 343, H0: 498, H1: 152, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-35125-030 DEC/LH": {
        type: "NSKP_DEC_SKILLION",
        panel: { W0: (246 - 120), W1: 545, W2: 120, W3: 120, W4: 658, H0: 947, H1: 350, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-35125-030 DEC/RH": {
        type: "NSKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: 545, W2: 120, W3: 120, W4: 658, H0: 947, H1: 350, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-2010-050 DEC/LH": {
        type: "NSKP_DEC_SKILLION",
        panel: { W0: (176 - 75), W1: 287/(Math.cos(16.6*Math.PI/180)), W2: 75, W3: 75, W4: 362, H0: 553, H1: 203, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-2010-050 DEC/RH": {
        type: "NSKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (176 - 75), W1: 287/(Math.cos(16.6*Math.PI/180)), W2: 75, W3: 75, W4: 362, H0: 553, H1: 203, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-35125-050 DEC/LH": {
        type: "NSKP_DEC_SKILLION",
        panel: { W0: (246 - 120), W1: 559, W2: 120, W3: 120, W4: 669, H0: 953, H1: 350, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-35125-050 DEC/RH": {
        type: "NSKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: 559, W2: 120, W3: 120, W4: 669, H0: 953, H1: 350, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-2510-075 DEC/LH": {
        type: "NSKP_DEC_SKILLION",
        panel: { W0: (176 - 75), W1: 416, W2: 75, W3: 75, W4: 475, H0: 710, H1: 254, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 160, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-2510-075 DEC/RH": {
        type: "NSKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (176 - 75), W1: 416, W2: 75, W3: 75, W4: 475, H0: 710, H1: 254, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 160, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-40125-075 DEC/LH": {
        type: "NSKP_DEC_SKILLION",
        panel: { W0: (246 - 120), W1: 584, W2: 120, W3: 120, W4: 688, H0: 1010, H1: 400, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-40125-075 DEC/RH": {
        type: "NSKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (246 - 120), W1: 584, W2: 120, W3: 120, W4: 688, H0: 1010, H1: 400, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1510-100 DEC/LH": {
        type: "NSKP_DEC_SKILLION",
        panel: { W0: (166 - 65), W1: 313, W2: 65, W3: 65, W4: 357, H0: 513, H1: 152, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-1510-100 DEC/RH": {
        type: "NSKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (166 - 65), W1: 313, W2: 65, W3: 65, W4: 357, H0: 513, H1: 152, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-20125-100 DEC/LH": {
        type: "NSKP_DEC_SKILLION",
        panel: { W0: (201 - 75), W1: 322, W2: 75, W3: 75, W4: 376, H0: 569, H1: 203, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSKP-20125-100 DEC/RH": {
        type: "NSKP_DEC_SKILLION",
        direction: "RH",
        panel: { W0: (201 - 75), W1: 322, W2: 75, W3: 75, W4: 376, H0: 569, H1: 203, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    }
};

export const KNEE_PLATE_FRAME_TOPHAT_SAMPLES = {
    "NSTKP-150-030-LH": {
        type: "NSTKP",
        panel: { W0: (218 - 65), W1: (333 - 65), W2: 65, W3: 65, H0: 489, H1: 0, H2: 195, H3: 100, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 88, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-150-030-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (218 - 65), W1: (333 - 65), W2: 65, W3: 65, H0: 489, H1: 0, H2: 195, H3: 100, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 88, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-030-LH": {
        type: "NSTKP",
        panel: { W0: (527 - 125), W1: 518, W2: 125, W3: 125, H0: 980, H1: 0, H2: 423, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 68, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-030-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: 518, W2: 125, W3: 125, H0: 980, H1: 0, H2: 423, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 68, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-100-050-LH": {
        type: "NSTKP",
        panel: { W0: (153 - 50), W1: (316 - 50), W2: 50, W3: 50, H0: 440, H1: 0, H2: 137, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 65, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-100-050-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: (316 - 50), W2: 50, W3: 50, H0: 440, H1: 0, H2: 137, H3: 100, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 65, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-050-LH": {
        type: "NSTKP",
        panel: { W0: (527 - 125), W1: (642 - 125), W2: 125, W3: 125, H0: 986, H1:0,  H2: 412, H3: 150, angle: Math.PI/36, thickness: 10 },
        holes: {  holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-050-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: (642 - 125), W2: 125, W3: 125, H0: 986, H1:0,  H2: 412, H3: 150, angle: Math.PI/36, thickness: 10 },
        holes: {  holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-150-075-LH": {
        type: "NSTKP",
        panel: { W0: (218 - 65), W1: (331 - 65), W2: 65, W3: 65, H0: 483, H1: 0, H2: 169, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 61, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-150-075-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (218 - 65), W1: (331 - 65), W2: 65, W3: 65, H0: 483, H1: 0, H2: 169, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 61, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-100-LH": {
        type: "NSTKP",
        panel: { W0: (527 - 125), W1: (637 - 125), W2: 125, W3: 125, H0: 975, H1: 39, H2: 400, H3: 150, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-100-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: (637 - 125), W2: 125, W3: 125, H0: 975, H1: 39, H2: 400, H3: 150, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-200-125-LH": {
        type: "NSTKP",
        panel: { W0: (279 - 75), W1: (338 - 75), W2: 75, W3: 75, H0: 540, H1: 0, H2: 207, H3: 100, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-200-125-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (279 - 75), W1: (338 - 75), W2: 75, W3: 75, H0: 540, H1: 0, H2: 207, H3: 100, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-350-150-LH": {
        type: "NSTKP",
        panel: { W0: (477 - 125), W1: 502, W2: 125, W3: 125, H0: 915, H1: 87, H2: 350, H3: 150, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-350-150-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (477 - 125), W1: 502, W2: 125, W3: 125, H0: 915, H1: 87, H2: 350, H3: 150, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-200-LH": {
        type: "NSTKP",
        panel: { W0: (527 - 125), W1: 489, W2: 125, W3: 125, H0: 949, H1: 135, H2: 400, H3: 150, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-200-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: 489, W2: 125, W3: 125, H0: 949, H1: 135, H2: 400, H3: 150, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-350-225-LH": {
        type: "NSTKP",
        panel: { W0: (477 - 125), W1: 480, W2: 125, W3: 125, H0: 898, H1: 158, H2: 350, H3: 150, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-350-225-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (477 - 125), W1: 480, W2: 125, W3: 125, H0: 898, H1: 158, H2: 350, H3: 150, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-100-250-LH": {
        type: "NSTKP",
        panel: { W0: (153 - 50), W1: 245, W2: 50, W3: 50, H0: 411, H1: 75, H2: 102, H3: 100, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-100-250-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 245, W2: 50, W3: 50, H0: 411, H1: 75, H2: 102, H3: 100, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-100-300-LH": {
        type: "NSTKP",
        panel: { W0: (153 - 50), W1: 234, W2: 50, W3: 50, H0: 404, H1: 100, H2: 102, H3: 100, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-100-300-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 234, W2: 50, W3: 50, H0: 404, H1: 100, H2: 102, H3: 100, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSTKP-150-030 DEC/LH": {
        type: "NSTKP_DEC",
        panel: { W0: (218 - 65), W1: 278, W2: 65, W3: 65, H0: 489, H1: 153, H2: 100, angle: Math.PI/60, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-150-030 DEC/RH": {
        type: "NSTKP_DEC",
        direction: "RH",
        panel: { W0: (218 - 65), W1: 278, W2: 65, W3: 65, H0: 489, H1: 153, H2: 100, angle: Math.PI/60, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-350-050 DEC/LH": {
        type: "NSTKP_DEC",
        panel: { W0: (477 - 125), W1: 549, W2: 125, W3: 125, H0: 968, H1: 350, H2: 150, angle: Math.PI/36, angle2: Math.PI/2 + (79/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-350-050 DEC/RH": {
        type: "NSTKP_DEC",
        direction: "RH",
        panel: { W0: (477 - 125), W1: 549, W2: 125, W3: 125, H0: 968, H1: 350, H2: 150, angle: Math.PI/36, angle2: Math.PI/2 + (79/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-100-075 DEC/LH": {
        type: "NSTKP_DEC",
        panel: { W0: (153 - 50), W1: 281, W2: 50, W3: 50, H0: 452, H1: 102, H2: 100, angle: Math.PI/24, angle2: Math.PI/2 + (72/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-100-075 DEC/RH": {
        type: "NSTKP_DEC",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 281, W2: 50, W3: 50, H0: 452, H1: 102, H2: 100, angle: Math.PI/24, angle2: Math.PI/2 + (72/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-150-100 DEC/LH": {
        type: "NSTKP_DEC",
        panel: { W0: (218 - 65), W1: 292, W2: 65, W3: 65, H0: 521, H1: 152, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (69/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-150-100 DEC/RH": {
        type: "NSTKP_DEC",
        direction: "RH",
        panel: { W0: (218 - 65), W1: 292, W2: 65, W3: 65, H0: 521, H1: 152, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (69/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-250-100 DEC/LH": {
        type: "NSTKP_DEC",
        panel: { W0: (331 - 75), W1: 408, W2: 75, W3: 75, H0: 739, H1: 254, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (73/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, holeRow: 3, W01: 45, W02: 80, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 80, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-250-100 DEC/RH": {
        type: "NSTKP_DEC",
        direction: "RH",
        panel: { W0: (331 - 75), W1: 408, W2: 75, W3: 75, H0: 739, H1: 254, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (73/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, holeRow: 3, W01: 45, W02: 80, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 80, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSTKP-400-030-F96-LH": {
        type: "NSTKP",
        panel: { W0: (497 - 95), W1: 518, W2: 95, W3: 95, H0: 980, H1: 0, H2: 423, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 68, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-030-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 518, W2: 95, W3: 95, H0: 980, H1: 0, H2: 423, H3: 150, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 68, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-050-F96-LH": {
        type: "NSTKP",
        panel: { W0: (497 - 95), W1: (612 - 95), W2: 95, W3: 95, H0: 986, H1: 0, H2: 412, H3: 150, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-050-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: (612 - 95), W2: 95, W3: 95, H0: 986, H1: 0, H2: 412, H3: 150, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-075-F96-LH": {
        type: "NSTKP",
        panel: { W0: (497 - 95), W1: 515, W2: 95, W3: 95, H0: 980, H1: 0, H2: 405, H3: 150, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 50, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-075-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 515, W2: 95, W3: 95, H0: 980, H1: 0, H2: 405, H3: 150, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 50, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-100-F96-LH": {
        type: "NSTKP",
        panel: { W0: (498 - 96), W1: 512, W2: 96, W3: 96, H0: 975, H1: 39, H2: 400, H3: 150, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-100-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (498 - 96), W1: 512, W2: 96, W3: 96, H0: 975, H1: 39, H2: 400, H3: 150, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-125-F96-LH": {
        type: "NSTKP",
        panel: { W0: (497 - 95), W1: (603 - 95), W2: 95, W3: 95, H0: 989, H1: 44, H2: 400, H3: 150, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-125-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: (603 - 95), W2: 95, W3: 95, H0: 989, H1: 44, H2: 400, H3: 150, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-150-F96-LH": {
        type: "NSTKP",
        panel: { W0: (497 - 95), W1: (597 - 95), W2: 95, W3: 95, H0: 964, H1: 87, H2: 400, H3: 150, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-150-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: (597 - 95), W2: 95, W3: 95, H0: 964, H1: 87, H2: 400, H3: 150, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-200-F96-LH": {
        type: "NSTKP",
        panel: { W0: (497 - 95), W1: 489, W2: 95, W3: 95, H0: 949, H1: 135, H2: 400, H3: 150, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-200-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 489, W2: 95, W3: 95, H0: 949, H1: 135, H2: 400, H3: 150, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-225-F96-LH": {
        type: "NSTKP",
        panel: { W0: (497 - 95), W1: 480, W2: 95, W3: 95, H0: 940, H1: 158, H2: 400, H3: 150, angle: Math.PI/8, thickness: 10 },
        holes: {  holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-225-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 480, W2: 95, W3: 95, H0: 940, H1: 158, H2: 400, H3: 150, angle: Math.PI/8, thickness: 10 },
        holes: {  holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-250-F96-LH": {
        type: "NSTKP",
        panel: { W0: (497 - 95), W1: 471, W2: 95, W3: 95, H0: 931, H1: 181, H2: 400, H3: 150, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-250-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 471, W2: 95, W3: 95, H0: 931, H1: 181, H2: 400, H3: 150, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-300-F96-LH": {
        type: "NSTKP",
        panel: { W0: (497 - 95), W1: 450, W2: 95, W3: 95, H0: 912, H1: 225, H2: 400, H3: 150, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-300-F96-RH": {
        type: "NSTKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 450, W2: 95, W3: 95, H0: 912, H1: 225, H2: 400, H3: 150, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSTKP-400-030-F96 DEC/LH": {
        type: "NSTKP_DEC",
        panel: { W0: (495 - 95), W1: 538, W2: 95, W3: 95, H0: 993, H1: 400, H2: 0, angle: Math.PI/60, angle2: Math.PI/2 + (83/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-030-F96 DEC/RH": {
        type: "NSTKP_DEC",
        direction: "RH",
        panel: { W0: (495 - 95), W1: 538, W2: 95, W3: 95, H0: 993, H1: 400, H2: 0, angle: Math.PI/60, angle2: Math.PI/2 + (83/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-075-F96 DEC/LH": {
        type: "NSTKP_DEC",
        panel: { W0: (497 - 95), W1: 568, W2: 95, W3: 95, H0: 1029, H1: 400, H2: 150, angle: Math.PI/24, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-075-F96 DEC/RH": {
        type: "NSTKP_DEC",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 568, W2: 95, W3: 95, H0: 1029, H1: 400, H2: 150, angle: Math.PI/24, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-100-F96 DEC/LH": {
        type: "NSTKP_DEC",
        panel: { W0: (497 - 95), W1: (677 - 95), W2: 95, W3: 95, H0: 1007, H1: 400, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTKP-400-100-F96 DEC/RH": {
        type: "NSTKP_DEC",
        direction: "RH",
        panel: { W0: (497 - 95), W1: (677 - 95), W2: 95, W3: 95, H0: 1007, H1: 400, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
};

export const KNEE_PLATE_FRAME_ZSECTION_SAMPLES = {
    "NSZKP-150-030-LH": {
        type: "NSZKP",
        panel: { W0: (218 - 65), W1: (333 - 65), W2: 65, W3: 65, H0: 489, H1: 0, H2: 195, H3: 100, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 179, H06: 60, H11: 88, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-150-030-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (218 - 65), W1: (333 - 65), W2: 65, W3: 65, H0: 489, H1: 0, H2: 195, H3: 100, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 179, H06: 60, H11: 88, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-350-050-LH": {
        type: "NSZKP",
        panel: { W0: (477 - 125), W1: (642 - 125), W2: 125, W3: 125, H0: 936, H1: 0, H2: 362, H3: 150, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 35, H04: 450, H05: 100, H06: (270 - 100), H07: 60, H11: 57, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-350-050-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (477 - 125), W1: (642 - 125), W2: 125, W3: 125, H0: 936, H1: 0, H2: 362, H3: 150, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 35, H04: 450, H05: 100, H06: (270 - 100), H07: 60, H11: 57, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-150-075-LH": {
        type: "NSZKP",
        panel: { W0: (218 - 65), W1: (331 - 65), W2: 65, W3: 65, H0: 483, H1: 0, H2: 169, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 167, H06: 60, H11: 61, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-150-075-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (218 - 65), W1: (331 - 65), W2: 65, W3: 65, H0: 483, H1: 0, H2: 169, H3: 100, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 167, H06: 60, H11: 61, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-100-100-LH": {
        type: "NSZKP",
        panel: { W0: (153 - 50), W1: (315 - 50), W2: 50, W3: 50, H0: 432, H1: 0, H2: 106, H3: 100, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 86, H11: 34, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-100-100-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: (315 - 50), W2: 50, W3: 50, H0: 432, H1: 0, H2: 106, H3: 100, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 86, H11: 34, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-350-100-LH": {
        type: "NSZKP",
        panel: { W0: (477 - 125), W1: 512, W2: 125, W3: 125, H0: 926, H1: 39, H2: 350, H3: 150, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 35, H04: 450, H05: 100, H06: (254 - 100), H07: 60, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-350-100-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (477 - 125), W1: 512, W2: 125, W3: 125, H0: 926, H1: 39, H2: 350, H3: 150, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 35, H04: 450, H05: 100, H06: (254 - 100), H07: 60, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-400-125-LH": {
        type: "NSZKP",
        panel: { W0: (527 - 125), W1: (633 - 125), W2: 125, W3: 125, H0: 989, H1: 44, H2: 400, H3: 150, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 81, H04: 445, H05: 100, H06: (294 - 100), H07: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-400-125-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: (633 - 125), W2: 125, W3: 125, H0: 989, H1: 44, H2: 400, H3: 150, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 81, H04: 445, H05: 100, H06: (294 - 100), H07: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-100-150-LH": {
        type: "NSZKP",
        panel: { W0: (153 - 50), W1: 261, W2: 50, W3: 50, H0: 425, H1: 23, H2: 102, H3: 100, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 86, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-100-150-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 261, W2: 50, W3: 50, H0: 425, H1: 23, H2: 102, H3: 100, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 86, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-200-200-LH": {
        type: "NSZKP",
        panel: { W0: (279 - 75), W1: 253, W2: 75, W3: 75, H0: 514, H1: 50, H2: 203, H3: 100, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, W21: 37, H01: 35, H02: 100, H03: 82, H04: 100, H05: (179 - 47), H06: 60, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-200-200-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (279 - 75), W1: 253, W2: 75, W3: 75, H0: 514, H1: 50, H2: 203, H3: 100, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, W21: 37, H01: 35, H02: 100, H03: 82, H04: 100, H05: (179 - 47), H06: 60, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-400-225-LH": {
        type: "NSZKP",
        panel: { W0: (527 - 125), W1: 480, W2: 125, W3: 125, H0: 940, H1: 158, H2: 400, H3: 150, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 76, H04: 438, H05: 100, H06: (253 - 100 - 29), H07: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-400-225-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: 480, W2: 125, W3: 125, H0: 940, H1: 158, H2: 400, H3: 150, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 76, H04: 438, H05: 100, H06: (253 - 100 - 29), H07: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-100-250-LH": {
        type: "NSZKP",
        panel: { W0: (153 - 50), W1: 245, W2: 50, W3: 50, H0: 411, H1: 75, H2: 102, H3: 100, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 88, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-100-250-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 245, W2: 50, W3: 50, H0: 411, H1: 75, H2: 102, H3: 100, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 88, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-350-300-LH": {
        type: "NSZKP",
        panel: { W0: (477 - 125), W1: 450, W2: 125, W3: 125, H0: 868, H1: 225, H2: 350, H3: 150, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, W21: 62, H01: 35, H02: 150, H03: 35, H04: (456 - 35), H05: 100, H06: (173 + 29 - 100), H07: 60, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-350-300-RH": {
        type: "NSZKP",
        direction: "RH",
        panel: { W0: (477 - 125), W1: 450, W2: 125, W3: 125, H0: 868, H1: 225, H2: 350, H3: 150, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, W21: 62, H01: 35, H02: 150, H03: 35, H04: (456 - 35), H05: 100, H06: (173 + 29 - 100), H07: 60, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSZKP-150-030 DEC/LH": {
        type: "NSZKP_DEC",
        panel: { W0: (218 - 65), W1: 278, W2: 65, W3: 65, H0: 489, H1: 153, H2: 100, angle: Math.PI/60, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 41, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 100, H06: 95, H07: 60, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-150-030 DEC/RH": {
        type: "NSZKP_DEC",
        direction: "RH",
        panel: { W0: (218 - 65), W1: 278, W2: 65, W3: 65, H0: 489, H1: 153, H2: 100, angle: Math.PI/60, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 41, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 100, H06: 95, H07: 60, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-300-050 DEC/LH": {
        type: "NSZKP_DEC",
        panel: { W0: (397 - 95), W1: 395, W2: 95, W3: 95, H0: 764, H1: 300, H2: 0, angle: Math.PI/36, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 210, W11: 35, W12: 150, W21: 47, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 269, H07: 60, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-300-050 DEC/RH": {
        type: "NSZKP_DEC",
        direction: "RH",
        panel: { W0: (397 - 95), W1: 395, W2: 95, W3: 95, H0: 764, H1: 300, H2: 0, angle: Math.PI/36, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 210, W11: 35, W12: 150, W21: 47, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 269, H07: 60, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-400-075 DEC/LH": {
        type: "NSZKP_DEC",
        panel: { W0: (527 - 125), W1: 568, W2: 125, W3: 125, H0: 1029, H1: 400, H2: 150, angle: Math.PI/24, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 150, H07: 403, H08: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-400-075 DEC/RH": {
        type: "NSZKP_DEC",
        direction: "RH",
        panel: { W0: (527 - 125), W1: 568, W2: 125, W3: 125, H0: 1029, H1: 400, H2: 150, angle: Math.PI/24, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 150, H07: 403, H08: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-200-100 DEC/LH": {
        type: "NSZKP_DEC",
        panel: { W0: (279 - 125), W1: 301, W2: 75, W3: 75, H0: 582, H1: 203, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (69/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, W21: 0, H01: 35, H02: 100, H03: 0, H04: 0, H05: 0, H06: 0, H07: 0, H08: 0, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-200-100 DEC/RH": {
        type: "NSZKP_DEC",
        direction: "RH",
        panel: { W0: (279 - 125), W1: 301, W2: 75, W3: 75, H0: 582, H1: 203, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (69/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, W21: 0, H01: 35, H02: 100, H03: 0, H04: 0, H05: 0, H06: 0, H07: 0, H08: 0, H11: 45, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-400-100 DEC/LH": {
        type: "NSZKP_DEC",
        panel: { W0: (525 - 125), W1: (707 - 125), W2: 125, W3: 125, H0: 1007, H1: 400, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 150, H07: 427, H08: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZKP-400-100 DEC/RH": {
        type: "NSZKP_DEC",
        direction: "RH",
        panel: { W0: (525 - 125), W1: (707 - 125), W2: 125, W3: 125, H0: 1007, H1: 400, H2: 0, angle: Math.PI/18, angle2: Math.PI/2 + (77/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 150, H07: 427, H08: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
};

export const KNEE_PLATE_ROLLER_DOOR_TOPHAT_SAMPLES = {
    "NSTRKP-150-030-LH": {
        type: "NSTRKP",
        panel: { W0: (218 - 65), W1: (333 - 65), W2: 65, H0: 489, H1: 0, H2: 195, H3: 288, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 88, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-150-030-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (218 - 65), W1: (333 - 65), W2: 65, H0: 489, H1: 0, H2: 195, H3: 288, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 88, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-050-LH": {
        type: "NSTRKP",
        panel: { W0: (527 - 125), W1: (642 - 125), W2: 125, H0: 986, H1: 0, H2: 412, H3: 562, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-050-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: (642 - 125), W2: 125, H0: 986, H1: 0, H2: 412, H3: 562, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-200-075-LH": {
        type: "NSTRKP",
        panel: { W0: (279 - 75), W1: (341 - 75), W2: 75, H0: 532, H1: 0, H2: 218, H3: 303, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, H01: 35, H02: 100, H11: 60, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-200-075-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (279 - 75), W1: (341 - 75), W2: 75, H0: 532, H1: 0, H2: 218, H3: 303, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, H01: 35, H02: 100, H11: 60, H12: 110, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-350-100-LH": {
        type: "NSTRKP",
        panel: { W0: (477 - 125), W1: 512, W2: 125, H0: 926, H1: 39, H2: 350, H3: 581, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-350-100-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (477 - 125), W1: 512, W2: 125, H0: 926, H1: 39, H2: 350, H3: 581, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-125-LH": {
        type: "NSTRKP",
        panel: { W0: (527 - 125), W1: (633 - 125), W2: 125, H0: 989, H1: 44, H2: 400, H3: 600, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-125-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: (633 - 125), W2: 125, H0: 989, H1: 44, H2: 400, H3: 600, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-100-150-LH": {
        type: "NSTRKP",
        panel: { W0: (153 - 50), W1: 261, W2: 50, H0: 425, H1: 23, H2: 102, H3: 301, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-100-150-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 261, W2: 50, H0: 425, H1: 23, H2: 102, H3: 301, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-200-LH": {
        type: "NSTRKP",
        panel: { W0: (527 - 125), W1: 489, W2: 125, H0: 949, H1: 135, H2: 400, H3: 627, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-200-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: 489, W2: 125, H0: 949, H1: 135, H2: 400, H3: 627, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-100-225-LH": {
        type: "NSTRKP",
        panel: { W0: (153 - 50), W1: 249, W2: 50, H0: 415, H1: 63, H2: 102, H3: 306, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-100-225-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 249, W2: 50, H0: 415, H1: 63, H2: 102, H3: 306, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-350-250-LH": {
        type: "NSTRKP",
        panel: { W0: (477 - 125), W1: 471, W2: 125, H0: 886, H1: 181, H2: 350, H3: 625, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-350-250-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (477 - 125), W1: 471, W2: 125, H0: 886, H1: 181, H2: 350, H3: 625, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-100-225-LH": {
        type: "NSTRKP",
        panel: { W0: (218 - 65), W1: 234, W2: 65, H0: 448, H1: 100, H2: 153, H3: 324, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-100-225-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (218 - 65), W1: 234, W2: 65, H0: 448, H1: 100, H2: 153, H3: 324, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 45, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSTRKP-150-030 DEC/LH": {
        type: "NSTRKP_DEC",
        panel: { W0: (218 - 65), W1: 278, W2: 65, H0: 489, H1: 153, H2: 280, angle: Math.PI/60, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-150-030 DEC/RH": {
        type: "NSTRKP_DEC",
        direction: "RH",
        panel: { W0: (218 - 65), W1: 278, W2: 65, H0: 489, H1: 153, H2: 280, angle: Math.PI/60, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, H01: 35, H02: 100, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-350-050 DEC/LH": {
        type: "NSTRKP_DEC",
        panel: { W0: (477 - 125), W1: 549, W2: 125, H0: 968, H1: 350, H2: 530, angle: Math.PI/36, angle2: (169/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-350-050 DEC/RH": {
        type: "NSTRKP_DEC",
        direction: "RH",
        panel: { W0: (477 - 125), W1: 549, W2: 125, H0: 968, H1: 350, H2: 530, angle: Math.PI/36, angle2: (169/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-100-075 DEC/LH": {
        type: "NSTRKP_DEC",
        panel: { W0: (153 - 50), W1: 281, W2: 50, H0: 452, H1: 102, H2: 279.9, angle: Math.PI/24, angle2: (162/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-100-075 DEC/RH": {
        type: "NSTRKP_DEC",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 281, W2: 50, H0: 452, H1: 102, H2: 279.9, angle: Math.PI/24, angle2: (162/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, H01: 35, H02: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-100 DEC/LH": {
        type: "NSTRKP_DEC",
        panel: { W0: (525 - 125), W1: (707 - 125), W2: 125, H0: 1007, H1: 400, H2: 530, angle: Math.PI/18, angle2: (170/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-100 DEC/RH": {
        type: "NSTRKP_DEC",
        direction: "RH",
        panel: { W0: (525 - 125), W1: (707 - 125), W2: 125, H0: 1007, H1: 400, H2: 530, angle: Math.PI/18, angle2: (170/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSTRKP-400-030-F96-LH": {
        type: "NSTRKP",
        panel: { W0: (497 - 95), W1: 518, W2: 95, H0: 980, H1: 0, H2: 423, H3: 550, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 68, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-030-F96-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 518, W2: 95, H0: 980, H1: 0, H2: 423, H3: 550, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 68, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-050-F96-LH": {
        type: "NSTRKP",
        panel: { W0: (497 - 95), W1: (612 - 95), W2: 95, H0: 986, H1: 0, H2: 412, H3: 562, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-050-F96-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: (612 - 95), W2: 95, H0: 986, H1: 0, H2: 412, H3: 562, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-075-F96-LH": {
        type: "NSTRKP",
        panel: { W0: (497 - 95), W1: 515, W2: 95, H0: 980, H1: 20, H2: 405, H3: 576, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 50, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-075-F96-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 515, W2: 95, H0: 980, H1: 20, H2: 405, H3: 576, angle: Math.PI/24, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 50, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-100-F96-LH": {
        type: "NSTRKP",
        panel: { W0: (498 - 96), W1: 512, W2: 96, H0: 975, H1: 39, H2: 400, H3: 589, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-100-F96-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (498 - 96), W1: 512, W2: 96, H0: 975, H1: 39, H2: 400, H3: 589, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-125-F96-LH": {
        type: "NSTRKP",
        panel: { W0: (497 - 95), W1: (603 - 95), W2: 95, H0: 989, H1: 44, H2: 400, H3: 600, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-125-F96-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: (603 - 95), W2: 95, H0: 989, H1: 44, H2: 400, H3: 600, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-150-F96-LH": {
        type: "NSTRKP",
        panel: { W0: (497 - 95), W1: 502, W2: 95, H0: 964, H1: 87, H2: 400, H3: 610, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-150-F96-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 502, W2: 95, H0: 964, H1: 87, H2: 400, H3: 610, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-200-F96-LH": {
        type: "NSTRKP",
        panel: { W0: (497 - 95), W1: 489, W2: 95, H0: 949, H1: 135, H2: 400, H3: 627, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-200-F96-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 489, W2: 95, H0: 949, H1: 135, H2: 400, H3: 627, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-250-F96-LH": {
        type: "NSTRKP",
        panel: { W0: (497 - 95), W1: 471, W2: 95, H0: 931, H1: 181, H2: 400, H3: 639, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-250-F96-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 471, W2: 95, H0: 931, H1: 181, H2: 400, H3: 639, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-300-F96-LH": {
        type: "NSTRKP",
        panel: { W0: (497 - 95), W1: 450, W2: 95, H0: 912, H1: 225, H2: 400, H3: 647, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-300-F96-RH": {
        type: "NSTRKP",
        direction: "RH",
        panel: { W0: (497 - 95), W1: 450, W2: 95, H0: 912, H1: 225, H2: 400, H3: 647, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },

    "NSTRKP-400-030-F96 DEC/LH": {
        type: "NSTRKP_DEC",
        panel: {  W0: (495 - 95), W1: 538, W2: 95, H0: 993, H1: 400, H2: 530, angle: Math.PI/60, angle2: (173/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-030-F96 DEC/RH": {
        type: "NSTRKP_DEC",
        direction: "RH",
        panel: {  W0: (495 - 95), W1: 538, W2: 95, H0: 993, H1: 400, H2: 530, angle: Math.PI/60, angle2: (173/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-075-F96 DEC/LH": {
        type: "NSTRKP_DEC",
        panel: { W0: (495 - 95), W1: 568, W2: 95, H0: 1029, H1: 400, H2: 529.7, angle: Math.PI/24, angle2: (168/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-075-F96 DEC/RH": {
        type: "NSTRKP_DEC",
        direction: "RH",
        panel: { W0: (495 - 95), W1: 568, W2: 95, H0: 1029, H1: 400, H2: 529.7, angle: Math.PI/24, angle2: (168/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-100-F96 DEC/LH": {
        type: "NSTRKP_DEC",
        panel: { W0: (495 - 95), W1: (677 - 95), W2: 95, H0: 1007, H1: 400, H2: 519, angle: Math.PI/18, angle2: (169/180)*Math.PI, thickness: 10 },
        holes: {  holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSTRKP-400-100-F96 DEC/RH": {
        type: "NSTRKP_DEC",
        direction: "RH",
        panel: { W0: (495 - 95), W1: (677 - 95), W2: 95, H0: 1007, H1: 400, H2: 519, angle: Math.PI/18, angle2: (169/180)*Math.PI, thickness: 10 },
        holes: {  holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, H01: 35, H02: 150, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
};

export const KNEE_PLATE_ROLLER_DOOR_ZSECTION_SAMPLES = {
    "NSZRKP-100-030-LH": {
        type: "NSZRKP",
        panel: { W0: (153 - 50), W1: (318 - 50), W2: 50, H0: 431, H1: 0, H2: 137, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 85, H11: 65, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-100-030-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: (318 - 50), W2: 50, H0: 431, H1: 0, H2: 137, angle: Math.PI/60, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 85, H11: 65, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-400-050-LH": {
        type: "NSZRKP",
        panel: { W0: (527 - 125), W1: (642 - 125), W2: 125, H0: 986, H1: 0, H2: 412, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 85, H04: 446, H05: 100, H06: (319 - ((85 + 446 + 100) - (35 + 3*150))), H07: 60, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-400-050-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: (642 - 125), W2: 125, H0: 986, H1: 0, H2: 412, angle: Math.PI/36, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 85, H04: 446, H05: 100, H06: (319 - ((85 + 446 + 100) - (35 + 3*150))), H07: 60, H11: 57, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-150-075-LH": {
        type: "NSZRKP",
        panel: { W0: (218 - 65), W1: (331 - 65), W2: 65, H0: 483, H1: 0, H2: 169, angle: Math.PI/24, thickness: 10 },
        holes: {  holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 167, H06: 60, H11: 61, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-150-075-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (218 - 65), W1: (331 - 65), W2: 65, H0: 483, H1: 0, H2: 169, angle: Math.PI/24, thickness: 10 },
        holes: {  holeNum: 3, W01: 45, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 167, H06: 60, H11: 61, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-300-100-LH": {
        type: "NSZRKP",
        panel: { W0: (397 - 95), W1: 364, W2: 95, H0: 727, H1: 13, H2: 300, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 210, W11: 35, W12: 150, W21: 48, H01: 35, H02: 150, H03: 280, H04: 100, H05: (205 - (280 + 100 - 35 - 2*150)), H06: 60, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-300-100-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (397 - 95), W1: 364, W2: 95, H0: 727, H1: 13, H2: 300, angle: Math.PI/18, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 210, W11: 35, W12: 150, W21: 48, H01: 35, H02: 150, H03: 280, H04: 100, H05: (205 - (280 + 100 - 35 - 2*150)), H06: 60, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-100-125-LH": {
        type: "NSZRKP",
        panel: { W0: (153 - 50), W1: (313 - 50), W2: 50, H0: 442, H1: 0, H2: 106, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 85, H11: 34, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-100-125-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: (313 - 50), W2: 50, H0: 442, H1: 0, H2: 106, angle: Math.PI/14.4, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 85, H11: 34, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-400-150-LH": {
        type: "NSZRKP",
        panel: { W0: (527 - 125), W1: 502, W2: 125, H0: 964, H1: 87, H2: 400, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 77.3, H04: 446.3, H05: 100, H06: 285 - ((77.3 + 446.3 + 100) - (35 + 3*150)), H07: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-400-150-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: 502, W2: 125, H0: 964, H1: 87, H2: 400, angle: Math.PI/12, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 77.3, H04: 446.3, H05: 100, H06: 285 - ((77.3 + 446.3 + 100) - (35 + 3*150)), H07: 60, H11: 45, H12: 310, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-100-200-LH": {
        type: "NSZRKP",
        panel: { W0: (153 - 50), W1: 254, W2: 50, H0: 419, H1: 50, H2: 102, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 87, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-100-200-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 254, W2: 50, H0: 419, H1: 50, H2: 102, angle: Math.PI/9, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 87, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-400-225-LH": {
        type: "NSZRKP",
        panel: { W0: (527 - 125), W1: 480, W2: 125, H0: 940, H1: 158, H2: 400, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 76, H04: 438, H05: 100, H06: 253 - ((76 + 438 + 100) - (35 + 3*150)), H07: 60, H11: 45, H12: 310 , radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-400-225-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: 480, W2: 125, H0: 940, H1: 158, H2: 400, angle: Math.PI/8, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 63, H01: 35, H02: 150, H03: 76, H04: 438, H05: 100, H06: 253 - ((76 + 438 + 100) - (35 + 3*150)), H07: 60, H11: 45, H12: 310 , radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-200-250-LH": {
        type: "NSZRKP",
        panel: { W0: (279 - 75), W1: 245, W2: 75, H0: 503, H1: 75, H2: 203, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, W21: 37, H01: 35, H02: 100, H03: 80, H04: 100, H05: 63 + ((35 + 2*100) - 180), H06: 60, H11: 45, H12: 110 , radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-200-250-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (279 - 75), W1: 245, W2: 75, H0: 503, H1: 75, H2: 203, angle: Math.PI/7.2, thickness: 10 },
        holes: { holeNum: 3, W01: 45, W02: 110, W11: 35, W12: 100, W21: 37, H01: 35, H02: 100, H03: 80, H04: 100, H05: 63 + ((35 + 2*100) - 180), H06: 60, H11: 45, H12: 110 , radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-400-300-LH": {
        type: "NSZRKP",
        panel: { W0: (527 - 125), W1: 450, W2: 125, H0: 912, H1: 225, H2: 400, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 62, H01: 35, H02: 150, H03: 78, H04: 421, H05: 100, H06: 217 - ((78 + 421 + 100) - (35 + 3*150)), H07: 60, H11: 45, H12: 310 , radiusX: 16/2, radiusY: 16/2  }
    },
    "NSZRKP-400-300-RH": {
        type: "NSZRKP",
        direction: "RH",
        panel: { W0: (527 - 125), W1: 450, W2: 125, H0: 912, H1: 225, H2: 400, angle: Math.PI/6, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 310, W11: 35, W12: 150, W21: 62, H01: 35, H02: 150, H03: 78, H04: 421, H05: 100, H06: 217 - ((78 + 421 + 100) - (35 + 3*150)), H07: 60, H11: 45, H12: 310 , radiusX: 16/2, radiusY: 16/2  }
    },

    "NSZRKP-150-030 DEC/LH": {
        type: "NSZRKP_DEC",
        panel: { W0: (218 - 65), W1: 278, W2: 65, H0: 489, H1: 153, angle: Math.PI/60, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 41, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 100, H06: 95, H07: 60, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-150-030 DEC/RH": {
        type: "NSZRKP_DEC",
        direction: "RH",
        panel: { W0: (218 - 65), W1: 278, W2: 65, H0: 489, H1: 153, angle: Math.PI/60, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 41, W02: 60, W11: 35, W12: 100, W21: 33, H01: 35, H02: 100, H03: 35, H04: 100, H05: 100, H06: 95, H07: 60, H11: 46, H12: 60, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-350-050 DEC/LH": {
        type: "NSZRKP_DEC",
        panel: { W0: (477 - 125), W1: 549, W2: 125, H0: 968, H1: 350, angle: Math.PI/36, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, W21: 62, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 150, H07: 323, H08: 60, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-350-050 DEC/RH": {
        type: "NSZRKP_DEC",
        direction: "RH",
        panel: { W0: (477 - 125), W1: 549, W2: 125, H0: 968, H1: 350, angle: Math.PI/36, angle2: (167/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 4, W01: 45, W02: 260, W11: 35, W12: 150, W21: 62, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 150, H07: 323, H08: 60, H11: 45, H12: 260, radiusX: 16/2, radiusY: 16/2 }
    },
    "NSZRKP-100-075 DEC/LH": {
        type: "NSZRKP_DEC",
        panel: { W0: (153 - 50), W1: 281, W2: 50, H0: 452, H1: 102, angle: Math.PI/24, angle2: (172/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 35, H04: 100, H05: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2}
    },
    "NSZRKP-100-075 DEC/RH": {
        type: "NSZRKP_DEC",
        direction: "RH",
        panel: { W0: (153 - 50), W1: 281, W2: 50, H0: 452, H1: 102, angle: Math.PI/24, angle2: (172/180)*Math.PI, thickness: 10 },
        holes: { holeNum: 3, W01: 30, W02: 40, W11: 35, W12: 100, W21: 25, H01: 35, H02: 100, H03: 35, H04: 100, H05: 100, H11: 30, H12: 40, radiusX: 16/2, radiusY: 16/2}
    },
    "NSZRKP-300-100 DEC/LH": {
        type: "NSZRKP_DEC",
        panel: { W0: (397 - 95), W1: 416, W2: 95, H0: 793, H1: 300, angle: Math.PI/18, angle2: (163/180)*Math.PI, thickness: 10},
        holes: { holeNum: 3, W01: 45, W02: 210, W11: 35, W12: 150, W21: 95/2, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 308, H07: 60, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2  }
    },
    "NSZRKP-300-100 DEC/RH": {
        type: "NSZRKP_DEC",
        direction: "RH",
        panel: { W0: (397 - 95), W1: 416, W2: 95, H0: 793, H1: 300, angle: Math.PI/18, angle2: (163/180)*Math.PI, thickness: 10},
        holes: { holeNum: 3, W01: 45, W02: 210, W11: 35, W12: 150, W21: 95/2, H01: 35, H02: 150, H03: 35, H04: 150, H05: 150, H06: 308, H07: 60, H11: 45, H12: 210, radiusX: 16/2, radiusY: 16/2  }
    },
};

export const LATERAL_KNEE_BRACE_SAMPLES = {
    "LDB-TH96-C100": {
        type: "LDB",
        panel: { W0: 40, W1: 29, W2: 245, H0: 100, H1: 31, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 15, H02: 20, H03: 30, H04: 20, radiusX: 6, radiusY: 6 }
    },
    "LDB-TH96-C150": {
        type: "LDB",
        panel: { W0: 40, W1: 29, W2: 245, H0: 120, H1: 31, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 15, H02: 30, H03: 30, H04: 30, radiusX: 6, radiusY: 6 }
    },
    "LDB-TH96-C300": {
        type: "LDB",
        panel: { W0: 40, W1: 29, W2: 255, H0: 190, H1: 31, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 20, H02: 28, H03: 28, H04: 40, H05: 28, H06: 28, radiusX: 6, radiusY: 6 }
    },
    "LDB-TH96-C400": {
        type: "LDB",
        panel: { W0: 40, W1: 29, W2: 255, H0: 250, H1: 31, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 25, H02: 38, H03: 38, H04: 50, H05: 38, H06: 38, radiusX: 6, radiusY: 6 }
    },
    "LDB-TH120-C100": {
        type: "LDB",
        panel: { W0: 40, W1: 53, W2: 245, H0: 100, H1: 55, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 15, H02: 20, H03: 30, H04: 20, radiusX: 6, radiusY: 6 }
    },
    "LDB-TH120-C200": {
        type: "LDB",
        panel: { W0: 40, W1: 53, W2: 245, H0: 150, H1: 55, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 20, H02: 35, H03: 40, H04: 35, radiusX: 6, radiusY: 6 }
    },
    "LDB-TH120-C300": {
        type: "LDB",
        panel: { W0: 40, W1: 53, W2: 255, H0: 190, H1: 55, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 20, H02: 28, H03: 28, H04: 40, H05: 28, H06: 28, radiusX: 6, radiusY: 6 }
    },
    "LDB-TH120-C400": {
        type: "LDB",
        panel: { W0: 40, W1: 53, W2: 255, H0: 250, H1: 55, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 25, H02: 38, H03: 38, H04: 50, H05: 38, H06: 38, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z100-C150": {
        type: "LDB",
        panel: { W0: 40, W1: 33, W2: 245, H0: 120, H1: 35, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 15, H02: 30, H03: 30, H04: 30, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z100-C250": {
        type: "LDB",
        panel: { W0: 40, W1: 33, W2: 245, H0: 150, H1: 35, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 20, H02: 35, H03: 40, H04: 35, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z100-C350": {
        type: "LDB",
        panel: { W0: 40, W1: 33, W2: 255, H0: 250, H1: 35, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 25, H02: 38, H03: 38, H04: 50, H05: 38, H06: 38, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z150-C100": {
        type: "LDB",
        panel: { W0: 40, W1: 82, W2: 244, H0: 100, H1: 85, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 15, H02: 20, H03: 30, H04: 20, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z150-C200": {
        type: "LDB",
        panel: { W0: 40, W1: 82, W2: 244, H0: 150, H1: 85, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 20, H02: 35, H03: 40, H04: 35, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z150-C300": {
        type: "LDB",
        panel: { W0: 40, W1: 82, W2: 254, H0: 190, H1: 85, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 20, H02: 28, H03: 28, H04: 40, H05: 28, H06: 28, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z150-C400": {
        type: "LDB",
        panel: { W0: 40, W1: 82, W2: 254, H0: 250, H1: 85, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 25, H02: 38, H03: 38, H04: 50, H05: 38, H06: 38, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z200-C150": {
        type: "LDB",
        panel: { W0: 40, W1: 120, W2: 314, H0: 120, H1: 123, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 15, H02: 30, H03: 30, H04: 30, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z200-C250": {
        type: "LDB",
        panel: { W0: 40, W1: 120, W2: 314, H0: 150, H1: 123, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 20, H02: 35, H03: 40, H04: 35, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z200-C350": {
        type: "LDB",
        panel: { W0: 40, W1: 120, W2: 324, H0: 250, H1: 123, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 25, H02: 38, H03: 38, H04: 50, H05: 38, H06: 38, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z250-C100": {
        type: "LDB",
        panel: { W0: 40, W1: 170, W2: 314, H0: 100, H1: 173, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 15, H02: 20, H03: 30, H04: 20, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z250-C200": {
        type: "LDB",
        panel: { W0: 40, W1: 170, W2: 314, H0: 150, H1: 173, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 20, H02: 35, H03: 40, H04: 35, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z250-C300": {
        type: "LDB",
        panel: { W0: 40, W1: 170, W2: 324, H0: 190, H1: 173, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 20, H02: 28, H03: 28, H04: 40, H05: 28, H06: 28, radiusX: 6, radiusY: 6 }
    },
    "LDB-Z250-C400": {
        type: "LDB",
        panel: { W0: 40, W1: 170, W2: 324, H0: 250, H1: 173, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 25, H02: 38, H03: 38, H04: 50, H05: 38, H06: 38, radiusX: 6, radiusY: 6 }
    },
    "LSB-TH96-C100": {
        type: "LDB",
        panel: { W0: 40, W1: 29, W2: 245, H0: 50, H1: 31, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 12, H02: 26, radiusX: 6, radiusY: 6 }
    },
    "LSB-TH96-C200": {
        type: "LDB",
        panel: { W0: 40, W1: 29, W2: 245, H0: 76, H1: 31, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 18, H02: 40, radiusX: 6, radiusY: 6 }
    },
    "LSB-TH96-C300": {
        type: "LDB",
        panel: { W0: 40, W1: 29, W2: 255, H0: 96, H1: 31, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 15, H02: 20, H03: 26, H04: 20, radiusX: 6, radiusY: 6 }
    },
    "LSB-TH96-C400": {
        type: "LDB",
        panel: { W0: 40, W1: 29, W2: 255, H0: 124, H1: 31, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 20, H02: 25, H03: 34, H04: 25, radiusX: 6, radiusY: 6 }
    },
    "LSB-TH120-C150": {
        type: "LDB",
        panel: { W0: 40, W1: 118, W2: 245, H0: 64, H1: 120, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 15, H02: 34, radiusX: 6, radiusY: 6 }
    },
    "LSB-TH120-C250": {
        type: "LDB",
        panel: { W0: 40, W1: 118, W2: 245, H0: 76, H1: 120, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 18, H02: 40, radiusX: 6, radiusY: 6 }
    },
    "LSB-TH120-C350": {
        type: "LDB",
        panel: { W0: 40, W1: 118, W2: 255, H0: 124, H1: 120, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 20, H02: 25, H03: 34, H04: 25, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z100-C100": {
        type: "LDB",
        panel: { W0: 40, W1: 33, W2: 245, H0: 50, H1: 35, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 12, H02: 26, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z100-C200": {
        type: "LDB",
        panel: { W0: 40, W1: 33, W2: 245, H0: 76, H1: 35, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 18, H02: 40, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z100-C300": {
        type: "LDB",
        panel: { W0: 40, W1: 33, W2: 255, H0: 96, H1: 35, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 15, H02: 20, H03: 26, H04: 20, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z100-C400": {
        type: "LDB",
        panel: { W0: 40, W1: 33, W2: 255, H0: 124, H1: 35, angle: Math.PI/2, thickness: 2.4 },
        holes: { H01: 20, H02: 25, H03: 34, H04: 25, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z150-C150": {
        type: "LDB",
        panel: { W0: 40, W1: 82, W2: 244, H0: 64, H1: 85, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 15, H02: 34, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z150-C250": {
        type: "LDB",
        panel: { W0: 40, W1: 82, W2: 244, H0: 76, H1: 85, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 18, H02: 40, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z150-C350": {
        type: "LDB",
        panel: { W0: 40, W1: 82, W2: 254, H0: 124, H1: 85, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 20, H02: 25, H03: 34, H04: 25, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z200-C100": {
        type: "LDB",
        panel: { W0: 40, W1: 120, W2: 314, H0: 50, H1: 123, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 12, H02: 26, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z200-C200": {
        type: "LDB",
        panel: { W0: 40, W1: 120, W2: 314, H0: 76, H1: 123, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 18, H02: 40, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z200-C300": {
        type: "LDB",
        panel: { W0: 40, W1: 120, W2: 324, H0: 96, H1: 123, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 15, H02: 20, H03: 26, H04: 20, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z200-C400": {
        type: "LDB",
        panel: { W0: 40, W1: 120, W2: 324, H0: 124, H1: 123, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 20, H02: 25, H03: 34, H04: 25, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z250-C150": {
        type: "LDB",
        panel: { W0: 40, W1: 170, W2: 314, H0: 64, H1: 173, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 15, H02: 34, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z250-C250": {
        type: "LDB",
        panel: { W0: 40, W1: 170, W2: 314, H0: 76, H1: 173, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 18, H02: 40, radiusX: 6, radiusY: 6 }
    },
    "LSB-Z250-C350": {
        type: "LDB",
        panel: { W0: 40, W1: 170, W2: 324, H0: 124, H1: 173, angle: Math.PI/2, thickness: 3 },
        holes: { H01: 20, H02: 25, H03: 34, H04: 25, radiusX: 6, radiusY: 6 }
    },
    "LSB-C150-45-LH": {
        type: "LSB",
        panel: { W0: 187, H0: 60, H1: 50, angle1: Math.PI/2, angle2: (135/180)*Math.PI, thickness: 3 },
        holes: { W01: 26, W02: 45, W03: 51, W04: 45, H01: 30, H11: 25, radiusX: 6, radiusY: 6 }
    },
    "LSB-C150-45-RH": {
        type: "LSB",
        direction: "RH",
        panel: { W0: 187, H0: 60, H1: 50, angle1: Math.PI/2, angle2: (135/180)*Math.PI, thickness: 3 },
        holes: { W01: 26, W02: 45, W03: 51, W04: 45, H01: 30, H11: 25, radiusX: 6, radiusY: 6 }
    },
    "LSB-C200-45-LH": {
        type: "LSB2",
        panel: { W0: 243, H0: 60, H1: 50, angle1: Math.PI/2, angle2: (135/180)*Math.PI, thickness: 3 },
        holes: { W01: 39, W02: 55, W03: 61, W04: 55, H01: 30, H11: 25, radiusX: 6, radiusY: 6 }
    },
    "LSB-C200-45-RH": {
        type: "LSB2",
        direction: "RH",
        panel: { W0: 243, H0: 60, H1: 50, angle1: Math.PI/2, angle2: (135/180)*Math.PI, thickness: 3 },
        holes: { W01: 39, W02: 55, W03: 61, W04: 55, H01: 30, H11: 25, radiusX: 6, radiusY: 6 }
    },
    "CPLKB": {
        type: "CPLKB",
        panel: { W0: 40, W1: 300, W2: 40, H0: 260, H1: 300, H2: 368, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 20, W02: 40, W03: 50, H01: 20, H02: 50, H03: 20, radiusX: 5/2, radiusY: 10/2 }
    },
}

export const OTHER_BRACKET_SAMPLES = {
    "GPB100-LH": {
        type: "GPB",
        panel: { W0: 111, W1: 70, H0: 74, angle: Math.PI/2, thickness: 5 },
        holes: { W01: (111 - 25 - 51), W02: 51, W03: 70 - 35, H01: 18, H02: 38, radiusX: 14/2, radiusY: 22/2 }
    },
    "GPB100-RH": {
        type: "GPB",
        direction: "RH",
        panel: { W0: 111, W1: 70, H0: 74, angle: Math.PI/2, thickness: 5 },
        holes: { W01: (111 - 25 - 51), W02: 51, W03: 70 - 35, H01: 18, H02: 38, radiusX: 14/2, radiusY: 22/2 }
    },
    "GPB200-LH": {
        type: "GPB",
        panel: { W0: 136, W1: 70, H0: 160, angle: Math.PI/2, thickness: 5 },
        holes: { W01: (136 - 25 - 76), W02: 76, W03: 70 - 35, H01: 25, H02: 110, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB200-RH": {
        type: "GPB",
        direction: "RH",
        panel: { W0: 136, W1: 70, H0: 160, angle: Math.PI/2, thickness: 5 },
        holes: { W01: (136 - 25 - 76), W02: 76, W03: 70 - 35, H01: 25, H02: 110, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB200&250-150-LH": {
        type: "GPB",
        panel: { W0: 146, W1: 70, H0: 110, angle: Math.PI/2, thickness: 5 },
        holes: { W01: (146 - (35 + 76)), W02: 76, W03: 70 - 35, H01: 25, H02: 60, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB200&250-150-RH": {
        type: "GPB",
        direction: "RH",
        panel: { W0: 146, W1: 70, H0: 110, angle: Math.PI/2, thickness: 5 },
        holes: { W01: (146 - (35 + 76)), W02: 76, W03: 70 - 35, H01: 25, H02: 60, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB250-LH": {
        type: "GPB",
        panel: { W0: 136, W1: 70, H0: 210, angle: Math.PI/2, thickness: 5 },
        holes: { W01: (136 - 25 - 76), W02: 76, W03: 70 - 35, H01: 25, H02: 160, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB250-RH": {
        type: "GPB",
        direction: "RH",
        panel: { W0: 136, W1: 70, H0: 210, angle: Math.PI/2, thickness: 5 },
        holes: { W01: (136 - 25 - 76), W02: 76, W03: 70 - 35, H01: 25, H02: 160, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB200-100DEG-LH": {
        type: "GPB",
        panel: { W0: 136, W1: 90, H0: 160, angle: (100/180)*Math.PI, thickness: 5 },
        holes: { W01: (136 - 25 - 76), W02: 76, W03: 90 - 35, H01: 25, H02: 110, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB200-100DEG-RH": {
        type: "GPB",
        direction: "RH",
        panel: { W0: 136, W1: 90, H0: 160, angle: (100/180)*Math.PI, thickness: 5 },
        holes: { W01: (136 - 25 - 76), W02: 76, W03: 90 - 35, H01: 25, H02: 110, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB250-100DEG-LH": {
        type: "GPB",
        panel: { W0: 136, W1: 85, H0: 210, angle: (100/180)*Math.PI, thickness: 5 },
        holes: { W01: (136 - 25 - 76), W02: 76, W03: 85 - 35, H01: 25, H02: 160, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB250-100DEG-RH": {
        type: "GPB",
        direction: "RH",
        panel: { W0: 136, W1: 85, H0: 210, angle: (100/180)*Math.PI, thickness: 5 },
        holes: { W01: (136 - 25 - 76), W02: 76, W03: 85 - 35, H01: 25, H02: 160, radiusX: 18/2, radiusY: 30/2 }
    },

    "GPB-B1-LH": {
        type: "GPB_B2",
        panel: { W0: 166, W1: 91, W2: 67, Wd: 20, H0: 110, H1: 150, Hd: 15, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 35, W02: 96, W03: 35, W04: 21, H01: 25, H02: 60, H03: 100, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB-B1-RH": {
        type: "GPB_B2",
        direction: "RH",
        panel: { W0: 166, W1: 91, W2: 67, Wd: 20, H0: 110, H1: 150, Hd: 15, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 35, W02: 96, W03: 35, W04: 21, H01: 25, H02: 60, H03: 100, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB-B2-LH": {
        type: "GPB_B2",
        panel: { W0: 146, W1: 91, W2: 146/2, Wd: 0, H0: 110, H1: 150, Hd: 0, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 35, W02: 76, W03: 35, W04: 21, H01: 25, H02: 60, H03: 100, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB-B2-RH": {
        type: "GPB_B2",
        direction: "RH",
        panel: { W0: 146, W1: 91, W2: 146/2, Wd: 0, H0: 110, H1: 150, Hd: 0, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 35, W02: 76, W03: 35, W04: 21, H01: 25, H02: 60, H03: 100, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB300-150-LH": {
        type: "GPB_B2",
        panel: { W0: 166, W1: 70, W2: 67, Wd: 20, H0: 110, H1: 110, Hd: 15, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 35, W02: 96, W03: 35, W04: 0, H01: 25, H02: 60, H03: 60, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB300-150-RH": {
        type: "GPB_B2",
        direction: "RH",
        panel: { W0: 166, W1: 70, W2: 67, Wd: 20, H0: 110, H1: 110, Hd: 15, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 35, W02: 96, W03: 35, W04: 0, H01: 25, H02: 60, H03: 60, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB-B3": {
        type: "GPB_B3",
        panel: { W0: 130, H0: 152, H1: 308, angle: (100/180)*Math.PI, thickness: 5 },
        holes: { W01: 35, W02: 60, H01: 35, H02: 70, H03: 120, H04: 100, H05: 100, radiusX: 18/2, radiusY: 30/2 }
    },
    "GPB-B4": {
        type: "GPB_B4",
        panel: { W0: 170, H0: 68, H1: 130, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 35, W02: 100, H01: 35, H02: 78, H03: 60, radiusX: 8/2, radiusY: 14/2 }
    },
    "BP1": {
        type: "BP",
        panel: { W0: 50, H0: 50, H1: (200 - 50), angle: (135/180)*Math.PI, thickness: 5 },
        holes: { W01: 25, H01: 25, H02: 150, radiusX: 18/2, radiusY: 18/2 }
    },
    "BP2": {
        type: "BP",
        panel: { W0: 50, H0: 50, H1: (255 - 50), angle: (135/180)*Math.PI, thickness: 5 },
        holes: { W01: 25, H01: 25, H02: 205, radiusX: 18/2, radiusY: 18/2 }
    },

    "FSP-200": {
        type: "FSP",
        panel: { W0: 170, H0: 70, thickness: 5 },
        holes: { W01: 30, W02: 55, W03: 55, H01: 35, radiusX: 18/2, radiusY: 18/2 }
    },
    "BRK-EP1": {
        type: "BRK_EP1",
        panel: { W0: 140, W1: 130, H0: 156, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 30, W02: 55, W03: 30, H01: 43, H02: 70, H03: 30, H04: 96, radiusX: 18/2, radiusY: 30/2 }
    },
    "BRK-EP2": {
        type: "BRK_EP2",
        panel: { W0: 140, W1: 130, H0: 76, angle: Math.PI/2, thickness: 5 },
        holes: { W01: 30, W02: 55, W03: 30, H01: 76/2, radiusX: 18/2, radiusY: 30/2 }
    },
    "ZFB-100": {
        type: "ZFB",
        panel: { W0: 144, W1: 52, Wd: 30, H0: 30, angle: Math.PI/4, thickness: 5 },
    },
    "ZFB-200": {
        type: "ZFB",
        panel: { W0: 288, W1: 77, Wd: 30, H0: 30, angle: Math.PI/4, thickness: 5 },
    },
    "ZFB-300": {
        type: "ZFB",
        panel: { W0: 426, W1: 96, Wd: 30, H0: 30, angle: Math.PI/4, thickness: 5 },
    },
    "ZFB-350": {
        type: "ZFB",
        panel: { W0: 496, W1: 126, Wd: 30, H0: 30, angle: Math.PI/4, thickness: 5 },
    },
    "ZDFB-300": {
        type: "ZFB",
        panel: { W0: 426, W1: 192, Wd: 30, H0: 30, angle: Math.PI/4, thickness: 5 },
    },
    "ZDFB-150": {
        type: "ZFB",
        panel: { W0: 216, W1: 130, Wd: 30, H0: 30, angle: Math.PI/4, thickness: 5 },
    },

    "CFB": {
        type: "CFB",
        panel: { W0: 50, W1: 179, H0: 30, angle1: (139/180)*Math.PI, angle2: (129/180)*Math.PI, thickness: 5 },
    },
    "CBG-150-10DEG": {
        type: "CBG",
        panel: { W0: 50, W1: 85, H0: 50, angle1: (170/180)*Math.PI, angle2: (100/180)*Math.PI, thickness: 5 },
    },

    "BKB-LH": {
        type: "BKB",
        panel: { W0: 80, W1: 189, W2: 75, H0: 278, H1: 186, H2: 385, angle1: Math.PI/2, angle2: (133/180)*Math.PI, thickness: 5 },
        holes: { W01: 35, W11: 30, W12: 113, H01: 39, H02: 100, H11: 30, H12: 100, rotateAngle: (133/180)*Math.PI - Math.PI/2, radiusX: 30/2, radiusY: 18/2 }
    },
    "BKB-RH": {
        type: "BKB",
        direction: "RH",
        panel: { W0: 80, W1: 189, W2: 75, H0: 278, H1: 186, H2: 385, angle1: Math.PI/2, angle2: (133/180)*Math.PI, thickness: 5 },
        holes: { W01: 35, W11: 30, W12: 113, H01: 39, H02: 100, H11: 30, H12: 100, rotateAngle: (133/180)*Math.PI - Math.PI/2, radiusX: 30/2, radiusY: 18/2 }
    },
    "TKB-LH": {
        type: "TKB",
        panel: { W0: 189, W1: 79, W2: 75, H0: 190, H1: 313, H2: 439, angle1: Math.PI/2, angle2: (127/180)*Math.PI, thickness: 5  },
        holes: { W01: 47, W02: 112, W11: 35, H01: 30, H02: 100, H11: 57, H12: 100, rotateAngle: (127/180)*Math.PI - Math.PI/2, radiusX: 30/2, radiusY: 18/2 }
    },
    "TKB-RH": {
        type: "TKB",
        direction: "RH",
        panel: { W0: 189, W1: 79, W2: 75, H0: 190, H1: 313, H2: 439, angle1: Math.PI/2, angle2: (127/180)*Math.PI, thickness: 5  },
        holes: { W01: 47, W02: 112, W11: 35, H01: 30, H02: 100, H11: 57, H12: 100, rotateAngle: (127/180)*Math.PI - Math.PI/2, radiusX: 30/2, radiusY: 18/2 }
    },
    "RDC200-10DEG-LH": {
        type: "RDC200",
        panel: { W0: 107, W1: 75, W2: 75, H0: 180, H1: 183, angle1: Math.PI/2, angle2: (100/180)*Math.PI, thickness: 5 },
        holes: { W01: 35, W21: 35, H01: 35, H02: 110, H11: 31, H12: 40, radiusX1: 30/2, radiusY1: 18/2 , radiusX2: 6, radiusY2: 4 }
    },
    "RDC200-10DEG-RH": {
        type: "RDC200",
        direction: "RH",
        panel: { W0: 107, W1: 75, W2: 75, H0: 180, H1: 183, angle1: Math.PI/2, angle2: (100/180)*Math.PI, thickness: 5 },
        holes: { W01: 35, W21: 35, H01: 35, H02: 110, H11: 31, H12: 40, radiusX1: 30/2, radiusY1: 18/2 , radiusX2: 6, radiusY2: 4 }
    },
    "CRWS-300": {
        type: "CRWS",
        panel: { W0: 1050, H0: 81, H1: 284, angle: Math.PI/2, thickness: 5  },
        holes: { W01: 35, W02: 215, W03: 100, W04: 100, W05: 565, W06: 70, H01: 40, H02: 118 - 81, H03: 210, radiusX1: 18/2, radiusY1: 30/2 , radiusX2: 18/2, radiusY2: 18/2 }
    },
    "CTB1-LH": {
        type: "CTB",
        panel: { W0: 1268, W1: 807, H0: 75, H1: 85, H2: 120, angle: Math.PI/2, angle2: (100/180)*Math.PI, thickness: 5 },
        holes: { W01: 35, W02: 100, W03: 100, W04: 43, W05: 128, W06: 128, W07: 128, H01: 45, H02: 113, H03: 94, H04: 23, H05: 23, H06: 23, rotateAngle: Math.PI/10, radiusX: 18/2, radiusY: 30/2 }
    },
    "CTB1-RH": {
        type: "CTB",
        direction: "RH",
        panel: { W0: 1268, W1: 807, H0: 75, H1: 85, H2: 120, angle: Math.PI/2, angle2: (100/180)*Math.PI, thickness: 5 },
        holes: { W01: 35, W02: 100, W03: 100, W04: 43, W05: 128, W06: 128, W07: 128, H01: 45, H02: 113, H03: 94, H04: 23, H05: 23, H06: 23, rotateAngle: Math.PI/10, radiusX: 18/2, radiusY: 30/2 }
    },
};

export const FLASHING_SAMPLES = {
    "NSCF-LH": {
        type: "NSCF",
        direction: "LH",
        panel: { W0: 90, H0: 90, thickness: 2, length: 100 },
    },
    "NSCF-RH": {
        type: "NSCF",
        direction: "RH",
        panel: { W0: 90, H0: 90, thickness: 2, length: 100 },
    },
    "NSGIF-T-C100-01-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 105, H0: 90, H1: 95, thickness: 2, length: 100 },
    },  
    "NSGIF-T-C100-01-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 105, H0: 90, H1: 95, thickness: 2, length: 100 },
    },  
    "NSGIF-T-C100-02-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 133, H0: 90, H1: 67, thickness: 2, length: 100 },
    },
    "NSGIF-T-C100-02-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 133, H0: 90, H1: 67, thickness: 2, length: 100 },
    },
    "NSGIF-C-C100-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 121, H0: 90, H1: 79, thickness: 2, length: 100 },
    },
    "NSGIF-C-C100-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 121, H0: 90, H1: 79, thickness: 2, length: 100 },
    },
    "NSGIF-T-C150-01-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 155, H0: 90, H1: 45, thickness: 2, length: 100 },
    },
    "NSGIF-T-C150-01-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 155, H0: 90, H1: 45, thickness: 2, length: 100 },
    },
    "NSGIF-T-C150-02-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 183, H0: 100, H1: 107, thickness: 2, length: 100 },
    },
    "NSGIF-T-C150-02-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 183, H0: 100, H1: 107, thickness: 2, length: 100 },
    },
    "NSGIF-C-C150-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 171, H0: 90, H1: 29, thickness: 2, length: 100 },
    },
    "NSGIF-C-C150-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 171, H0: 90, H1: 29, thickness: 2, length: 100 },
    },
    "NSGIF-T-C200-01-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 205, H0: 90, H1: 95, thickness: 2, length: 100 },
    },
    "NSGIF-T-C200-01-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 205, H0: 90, H1: 95, thickness: 2, length: 100 },
    },
    "NSGIF-T-C200-02-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 233, H0: 90, H1: 67, thickness: 2, length: 100 },
    },
    "NSGIF-T-C200-02-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 233, H0: 90, H1: 67, thickness: 2, length: 100 },
    },
    "NSGIF-C-C200-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 221, H0: 90, H1: 79, thickness: 2, length: 100 },
    },
    "NSGIF-C-C200-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 221, H0: 90, H1: 79, thickness: 2, length: 100 },
    },
    "NSGIF-T-C250-01-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 255, H0: 90, H1: 45, thickness: 2, length: 100 },
    },
    "NSGIF-T-C250-01-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 255, H0: 90, H1: 45, thickness: 2, length: 100 },
    },
    "NSGIF-T-C250-02-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 283, H0: 100, H1: 107, thickness: 2, length: 100 },
    },
    "NSGIF-T-C250-02-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 283, H0: 100, H1: 107, thickness: 2, length: 100 },
    },
    "NSGIF-C-C250-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 271, H0: 100, H1: 119, thickness: 2, length: 100 },
    },
    "NSGIF-C-C250-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 271, H0: 100, H1: 119, thickness: 2, length: 100 },
    },
    "NSGIF-T-C300-01-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 305, H0: 90, H1: 95, thickness: 2, length: 100 },
    },
    "NSGIF-T-C300-01-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 305, H0: 90, H1: 95, thickness: 2, length: 100 },
    },
    "NSGIF-T-C300-02-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 333, H0: 90, H1: 67, thickness: 2, length: 100 },
    },
    "NSGIF-T-C300-02-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 333, H0: 90, H1: 67, thickness: 2, length: 100 },
    },
    "NSGIF-C-C300-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 321, H0: 90, H1: 79, thickness: 2, length: 100 },
    },
    "NSGIF-C-C300-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 321, H0: 90, H1: 79, thickness: 2, length: 100 },
    },
    "NSHCF-LH": {
        type: "NSHCF",
        direction: "LH",
        panel: { W0: 25, W1: 50, W2: 50, H0: 50, H1: 50, H2: 25, thickness: 2, length: 100 },
    },
    "NSHCF-RH": {
        type: "NSHCF",
        direction: "RH",
        panel: { W0: 25, W1: 50, W2: 50, H0: 50, H1: 50, H2: 25, thickness: 2, length: 100 },
    },
    "NSHCF-RD-64-LH": {
        type: "NSHCF_RD",
        direction: "LH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 150, thickness: 2, length: 100 },
    },
    "NSHCF-RD-64-RH": {
        type: "NSHCF_RD",
        direction: "RH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 150, thickness: 2, length: 100 },
    },
    "NSHCF-RD-100-LH": {
        type: "NSHCF_RD",
        direction: "LH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 180, thickness: 2, length: 100 },
    },
    "NSHCF-RD-100-RH": {
        type: "NSHCF_RD",
        direction: "RH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 180, thickness: 2, length: 100 },
    },
    "NSHCF-RD-120-LH": {
        type: "NSHCF_RD",
        direction: "LH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 210, thickness: 2, length: 100 },
    },
    "NSHCF-RD-120-RH": {
        type: "NSHCF_RD",
        direction: "RH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 210, thickness: 2, length: 100 },
    },
    "NSHCF-RD-150-LH": {
        type: "NSHCF_RD",
        direction: "LH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 240, thickness: 2, length: 100 },
    },
    "NSHCF-RD-150-RH": {
        type: "NSHCF_RD",
        direction: "RH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 240, thickness: 2, length: 100 },
    },
    "NSHCF-RD-200-LH": {
        type: "NSHCF_RD",
        direction: "LH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 290, thickness: 2, length: 100 },
    },
    "NSHCF-RD-200-RH": {
        type: "NSHCF_RD",
        direction: "RH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 290, thickness: 2, length: 100 },
    },
    "NSHCF-RD-250-LH": {
        type: "NSHCF_RD",
        direction: "LH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 340, thickness: 2, length: 100 },
    },
    "NSHCF-RD-250-RH": {
        type: "NSHCF_RD",
        direction: "RH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 340, thickness: 2, length: 100 },
    },
    "NSHCF-PAD-LH": {
        type: "NSHCF_RD",
        direction: "LH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 65, thickness: 2, length: 100 },
    },
    "NSHCF-PAD-RH": {
        type: "NSHCF_RD",
        direction: "RH",
        panel: { W0: 50, W1: 50, H0: 25, H1: 65, thickness: 2, length: 100 },
    },
    "NSHCF-TCV-LH": {
        type: "NSHCF_TCV",
        direction: "LH",
        panel: { W0: 50, W1: 10, H0: 40, angle: (150/180)*Math.PI, thickness: 2, length: 100 },
    },
    "NSHCF-TCV-RH": {
        type: "NSHCF_TCV",
        direction: "RH",
        panel: { W0: 50, W1: 10, H0: 40, angle: (150/180)*Math.PI, thickness: 2, length: 100 },
    },
    "NSHGIF-C100-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 143, H0: 90, H1: 57, thickness: 2, length: 100 },
    },
    "NSHGIF-C100-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 143, H0: 90, H1: 57, thickness: 2, length: 100 },
    },
    "NSHGIF-C150-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 193, H0: 90, H1: 107, thickness: 2, length: 100 },
    },
    "NSHGIF-C150-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 193, H0: 90, H1: 107, thickness: 2, length: 100 },
    },
    "NSHGIF-C200-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 243, H0: 90, H1: 57, thickness: 2, length: 100 },
    },
    "NSHGIF-C200-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 243, H0: 90, H1: 57, thickness: 2, length: 100 },
    },
    "NSHGIF-C250-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 293, H0: 100, H1: 97, thickness: 2, length: 100 },
    },
    "NSHGIF-C250-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 293, H0: 100, H1: 97, thickness: 2, length: 100 },
    },
    "NSHGIF-C300-LH": {
        type: "NSGIF",
        direction: "LH",
        panel: { W0: 343, H0: 90, H1: 57, thickness: 2, length: 100 },
    },
    "NSHGIF-C300-RH": {
        type: "NSGIF",
        direction: "RH",
        panel: { W0: 343, H0: 90, H1: 57, thickness: 2, length: 100 },
    },
    "NSHOF-C-64-LH": {
        type: "NSHOF",
        direction: "LH",
        panel: { W0: 25, W1: 50, W2: 50, H0: 112, H1: 25, thickness: 2, length: 100 },
    },
    "NSHOF-C-64-RH": {
        type: "NSHOF",
        direction: "RH",
        panel: { W0: 25, W1: 50, W2: 50, H0: 112, H1: 25, thickness: 2, length: 100 },
    },
    "NSHOF-C-96-LH": {
        type: "NSHOF",
        direction: "LH",
        panel: { W0: 25, W1: 50, W2: 50, H0: 144, H1: 25, thickness: 2, length: 100 },
    },
    "NSHOF-C-96-RH": {
        type: "NSHOF",
        direction: "RH",
        panel: { W0: 25, W1: 50, W2: 50, H0: 144, H1: 25, thickness: 2, length: 100 },
    },
    "NSHOF-C-120-LH": {
        type: "NSHOF",
        direction: "LH",
        panel: { W0: 25, W1: 50, W2: 50, H0: 168, H1: 25, thickness: 2, length: 100 },
    },
    "NSHOF-C-120-RH": {
        type: "NSHOF",
        direction: "RH",
        panel: { W0: 25, W1: 50, W2: 50, H0: 168, H1: 25, thickness: 2, length: 100 },
    },
    "NSICF-LH": {
        type: "NSICF",
        direction: "LH",
        panel: { W0: 90, H0: 90, thickness: 2, length: 500 },
    },
    "NSICF-RH": {
        type: "NSICF",
        direction: "RH",
        panel: { W0: 90, H0: 90, thickness: 2, length: 500 },
    },
    "NSOF-01-TH61-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 80, thickness: 2, length: 100 },
    },
    "NSOF-01-TH61-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 80, thickness: 2, length: 100 },
    },
    "NSOF-01-TH64-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 83, thickness: 2, length: 100 },
    },
    "NSOF-01-TH64-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 83, thickness: 2, length: 100 },
    },
    "NSOF-01-TH96-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 115, thickness: 2, length: 100 },
    },
    "NSOF-01-TH96-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 115, thickness: 2, length: 100 },
    },
    "NSOF-01-TH120-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 139, thickness: 2, length: 100 },
    },
    "NSOF-01-TH120-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 139, thickness: 2, length: 100 },
    },
    "NSOF-01-Z100-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 121, thickness: 2, length: 100 },
    },
    "NSOF-01-Z100-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 121, thickness: 2, length: 100 },
    },
    "NSOF-01-Z150-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 171, thickness: 2, length: 100 },
    },
    "NSOF-01-Z150-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 171, thickness: 2, length: 100 },
    },
    "NSOF-01-Z200-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 222, thickness: 2, length: 100 },
    },
    "NSOF-01-Z200-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 222, thickness: 2, length: 100 },
    },
    "NSOF-01-Z250-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 273, thickness: 2, length: 100 },
    },
    "NSOF-01-Z250-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 273, thickness: 2, length: 100 },
    },
    "NSOF-02A-TH61-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 65, thickness: 2, length: 100 },
    },
    "NSOF-02A-TH61-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 65, thickness: 2, length: 100 },
    },
    "NSOF-02A-TH64-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 68, thickness: 2, length: 100 },
    },
    "NSOF-02A-TH64-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 68, thickness: 2, length: 100 },
    },
    "NSOF-02A-TH96-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 100, thickness: 2, length: 100 },
    },
    "NSOF-02A-TH96-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 100, thickness: 2, length: 100 },
    },
    "NSOF-02A-TH120-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 124, thickness: 2, length: 100 },
    },
    "NSOF-02A-TH120-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 124, thickness: 2, length: 100 },
    },
    "NSOF-02A-Z100-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 106, thickness: 2, length: 100 },
    },
    "NSOF-02A-Z100-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 106, thickness: 2, length: 100 },
    },
    "NSOF-02A-Z150-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 156, thickness: 2, length: 100 },
    },
    "NSOF-02A-Z150-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 156, thickness: 2, length: 100 },
    },
    "NSOF-02A-Z200-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 207, thickness: 2, length: 100 },
    },
    "NSOF-02A-Z200-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 207, thickness: 2, length: 100 },
    },
    "NSOF-02A-Z250-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 258, thickness: 2, length: 100 },
    },
    "NSOF-02A-Z250-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 258, thickness: 2, length: 100 },
    },
    "NSOF-02B-TH61-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 90, thickness: 2, length: 100 },
    },
    "NSOF-02B-TH61-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 90, thickness: 2, length: 100 },
    },
    "NSOF-02B-TH64-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 93, thickness: 2, length: 100 },
    },
    "NSOF-02B-TH64-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 93, thickness: 2, length: 100 },
    },
    "NSOF-02B-TH96-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 125, thickness: 2, length: 100 },
    },
    "NSOF-02B-TH96-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 125, thickness: 2, length: 100 },
    },
    "NSOF-02B-TH120-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 149, thickness: 2, length: 100 },
    },
    "NSOF-02B-TH120-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 149, thickness: 2, length: 100 },
    },
    "NSOF-02B-Z100-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 131, thickness: 2, length: 100 },
    },
    "NSOF-02B-Z100-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 131, thickness: 2, length: 100 },
    },
    "NSOF-02B-Z150-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 181, thickness: 2, length: 100 },
    },
    "NSOF-02B-Z150-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 181, thickness: 2, length: 100 },
    },
    "NSOF-02B-Z200-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 232, thickness: 2, length: 100 },
    },
    "NSOF-02B-Z200-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 232, thickness: 2, length: 100 },
    },
    "NSOF-02B-Z250-LH": {
        type: "NSOF",
        direction: "LH",
        panel: { W0: 25, W1: 90, H0: 283, thickness: 2, length: 100 },
    },
    "NSOF-02B-Z250-RH": {
        type: "NSOF",
        direction: "RH",
        panel: { W0: 25, W1: 90, H0: 283, thickness: 2, length: 100 },
    },
    "NS-J-T-LH": {
        type: "NS_J",
        direction: "LH",
        panel: { W0: 32, H0: 15, H1: 53, thickness: 2, length: 100 },
    },
    "NS-J-T-RH": {
        type: "NS_J",
        direction: "RH",
        panel: { W0: 32, H0: 15, H1: 53, thickness: 2, length: 100 },
    },
    "NS-J-C-LH": {
        type: "NS_J",
        direction: "LH",
        panel: { W0: 20, H0: 15, H1: 65, thickness: 2, length: 100 },
    },
    "NS-J-C-RH": {
        type: "NS_J",
        direction: "RH",
        panel: { W0: 20, H0: 15, H1: 65, thickness: 2, length: 100 },
    },
    "NS-J-K-LH": {
        type: "NS_J",
        direction: "LH",
        panel: { W0: 16, H0: 15, H1: 65, thickness: 2, length: 100 },
    },
    "NS-J-K-RH": {
        type: "NS_J",
        direction: "RH",
        panel: { W0: 16, H0: 15, H1: 65, thickness: 2, length: 100 },
    },
}

export const BASE_PLATE_SAMPLES = {
    "CPB-100": {
        type: "CPB_100",
        panel: { W0: 160, W1: 89, W2: 16, W3: 6, H0: 300, H1: 248, angle: (135/180)*Math.PI, thickness0: 12, thickness1: 3, thickness2: 6, length0: 110, length1: 11 },
        holes: { radius: 18 }
    },
    "CPB-100A": {
        type: "CPB_100A",
        panel: { W0: 143, W1: 89, W2: 10, H0: 300, H1: 246, angle: (135/180)*Math.PI, thickness0: 3, thickness1: 6, length0: 100, length1: 5.5 },
        holes: { radius: 18 }
    },
    "CPB-125": {
        type: "CPB_125",
        panel: { W0: 143, W1: 100, W2: 10, H0: 300, H1: 246, H2: 10, H3: 250, Wd: 75, Hd: 30, td: 5, angle: (135/180)*Math.PI, thickness0: 4, thickness1: 6, length0: 120, length1: 10 },
        holes: { H01: 60, H02: 180, radius: 18 }
    },
    "NSBPC-150-8": {
        type: "NSBPC",
        panel: { W0: 87, W1: 154, H0: 375, H1: (30 + 3*55), H2: 45, angle: (110/180)*Math.PI, thickness: 5, length: 65 },
        holes: { holeColumn: 1, holeNum: 4, H01: 55, radius: 24 }
    },
    "NSBPC-150-16": {
        type: "NSBPC",
        panel: { W0: 82, W1: 154, H0: 372, H1: (30 + 3*55), H2: 45, angle: (110/180)*Math.PI, thickness: 5, length: 130 },
        holes: { holeColumn: 2, holeNum: 4, W01: 65, H01: 55, radius: 24 }
    },
    "NSBPC-200-8": {
        type: "NSBPC",
        panel: { W0: 114, W1: 204, H0: 366, H1: (30 + 3*55), H2: 45, angle: (110/180)*Math.PI, thickness: 5, length: 75 },
        holes: { holeColumn: 1, holeNum: 4, H01: 55, radius: 24 }
    },
    "NSBPC-200-16": {
        type: "NSBPC",
        panel: { W0: 109, W1: 204, H0: 363, H1: (30 + 3*55), H2: 45, angle: (110/180)*Math.PI, thickness: 5, length: 150 },
        holes: { holeColumn: 2, holeNum: 4, W01: 75, H01: 55, radius: 24 }
    },
    "NSBPC-250-8": {
        type: "NSBPC",
        panel: { W0: 140, W1: 254, H0: 357, H1: (30 + 3*55), H2: 45, angle: (110/180)*Math.PI, thickness: 5, length: 75 },
        holes: { holeColumn: 1, holeNum: 4, H01: 55, radius: 24 }
    },
    "NSBPC-250-16": {
        type: "NSBPC",
        panel: { W0: 135, W1: 254, H0: 353, H1: (30 + 3*55), H2: 45, angle: (110/180)*Math.PI, thickness: 5, length: 150 },
        holes: { holeColumn: 2, holeNum: 4, W01: 75, H01: 55, radius: 24 }
    },
    "NSBPC-300-8": {
        type: "NSBPC",
        panel: { W0: 180, W1: 302, H0: 355, H1: (30 + 3*55), H2: 45, angle: (120/180)*Math.PI, thickness: 5, length: 100 },
        holes: { holeColumn: 1, holeNum: 4, H01: 55, radius: 24 }
    },
    "NSBPC-300-16": {
        type: "NSBPC",
        panel: { W0: 174, W1: 302, H0: 352, H1: (30 + 3*55), H2: 45, angle: (120/180)*Math.PI, thickness: 5, length: 200 },
        holes: { holeColumn: 2, holeNum: 4, W01: 100, H01: 55, radius: 24 }
    },
    "NSBPC-350-8": {
        type: "NSBPC",
        panel: { W0: 203, W1: 352, H0: 352, H1: (30 + 3*55), H2: 45, angle: (120/180)*Math.PI, thickness: 5, length: 100 },
        holes: { holeColumn: 1, holeNum: 4, H01: 55, radius: 24 }
    },
    "NSBPC-350-16": {
        type: "NSBPC",
        panel: { W0: 203, W1: 352, H0: 352, H1: (30 + 3*55), H2: 45, angle: (120/180)*Math.PI, thickness: 5, length: 200 },
        holes: { holeColumn: 2, holeNum: 4, W01: 125, H01: 55, radius: 24 }
    },
    "NSBPC-400-8": {
        type: "NSBPC",
        panel: { W0: 232, W1: 402, H0: 352, H1: (30 + 3*55), H2: 45, angle: (120/180)*Math.PI, thickness: 5, length: 100 },
        holes: { holeColumn: 1, holeNum: 4, H01: 55, radius: 24 }
    },
    "NSBPC-400-16": {
        type: "NSBPC",
        panel: { W0: 232, W1: 402, H0: 352, H1: (30 + 3*55), H2: 45, angle: (120/180)*Math.PI, thickness: 5, length: 200 },
        holes: { holeColumn: 2, holeNum: 4, W01: 125, H01: 55, radius: 24 }
    },

    "CPT-100A": {
        type: "CPT_100A",
        panel: { W0: 90, H0: 800, thickness: 3 },
        holes: { H01: 40, H02: 380, bottomHoleRadius: 20 }
    },

    "CPT-125A": {
        type: "CPT_125A",
        panel: { W0: 100, H0: 600, H1: 10, H2: 195, Wd: 75, Hd: 30, td: 5, thickness: 3 },
        holes: { H01: 60, H02: 240, bottomHoleRadius: 20 }
    },

    "NSBP16-150-8": {
        type: "NSBP",
        panel: { W0: 178, W1: 154, H0: 261, thickness0: 16, thickness1: 8, length: 65 },
        holes: { W01: 80, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-150-16": {
        type: "NSBP",
        panel: { W0: 178, W1: 154, H0: 261, thickness0: 16, thickness1: 8, length: 130 },
        holes: { holeColumn: 2, W01: 80, W02: 65, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-200-8": {
        type: "NSBP",
        panel: { W0: 228, W1: 204, H0: 261, thickness0: 16, thickness1: 8, length: 75 },
        holes: { W01: 100, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-200-16": {
        type: "NSBP",
        panel: { W0: 228, W1: 204, H0: 261, thickness0: 16, thickness1: 8, length: 150 },
        holes: { holeColumn: 2, W01: 100, W02: 75, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-250-8": {
        type: "NSBP",
        panel: { W0: 280, W1: 256, H0: 261, thickness0: 16, thickness1: 8, length: 75 },
        holes: { W01: 130, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-250-16": {
        type: "NSBP",
        panel: { W0: 280, W1: 256, H0: 261, thickness0: 16, thickness1: 8, length: 150 },
        holes: { holeColumn: 2, W01: 130, W02: 75, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-300-8": {
        type: "NSBP",
        panel: { W0: 326, W1: 302, H0: 261, thickness0: 16, thickness1: 8, length: 100 },
        holes: { W01: 180, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-300-16": {
        type: "NSBP",
        panel: { W0: 326, W1: 302, H0: 261, thickness0: 16, thickness1: 8, length: 192 },
        holes: { holeColumn: 2, W01: 180, W02: 96, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-350-8": {
        type: "NSBP",
        panel: { W0: 376, W1: 352, H0: 261, thickness0: 16, thickness1: 8, length: 125 },
        holes: { W01: 230, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-350-16": {
        type: "NSBP",
        panel: { W0: 376, W1: 352, H0: 261, thickness0: 16, thickness1: 8, length: 250 },
        holes: { holeColumn: 2, W01: 230, W02: 125, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-400-8": {
        type: "NSBP",
        panel: { W0: 426, W1: 402, H0: 261, thickness0: 16, thickness1: 8, length: 125 },
        holes: { W01: 280, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP16-400-16": {
        type: "NSBP",
        panel: { W0: 426, W1: 402, H0: 261, thickness0: 16, thickness1: 8, length: 250 },
        holes: { holeColumn: 2, W01: 280, W02: 125, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-150-8": {
        type: "NSBP",
        panel: { W0: 178, W1: 154, H0: 269, thickness0: 24, thickness1: 8, length: 65 },
        holes: { W01: 80, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-150-16": {
        type: "NSBP",
        panel: { W0: 178, W1: 154, H0: 269, thickness0: 24, thickness1: 8, length: 130 },
        holes: { holeColumn: 2, W01: 80, W02: 65, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-200-8": {
        type: "NSBP",
        panel: { W0: 228, W1: 204, H0: 269, thickness0: 24, thickness1: 8, length: 75 },
        holes: { W01: 100, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-200-16": {
        type: "NSBP",
        panel: { W0: 228, W1: 204, H0: 269, thickness0: 24, thickness1: 8, length: 130 },
        holes: { holeColumn: 2, W01: 100, W02: 75, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-250-8": {
        type: "NSBP",
        panel: { W0: 280, W1: 256, H0: 269, thickness0: 24, thickness1: 8, length: 75 },
        holes: { W01: 130, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-250-16": {
        type: "NSBP",
        panel: { W0: 280, W1: 256, H0: 269, thickness0: 24, thickness1: 8, length: 150 },
        holes: { holeColumn: 2, W01: 130, W02: 75, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-300-8": {
        type: "NSBP",
        panel: { W0: 326, W1: 302, H0: 269, thickness0: 24, thickness1: 8, length: 100 },
        holes: { W01: 180, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-300-16": {
        type: "NSBP",
        panel: { W0: 326, W1: 302, H0: 269, thickness0: 24, thickness1: 8, length: 192 },
        holes: { holeColumn: 2, W01: 180, W02: 96, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-350-8": {
        type: "NSBP",
        panel: { W0: 376, W1: 352, H0: 269, thickness0: 24, thickness1: 8, length: 125 },
        holes: { W01: 230, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-350-16": {
        type: "NSBP",
        panel: { W0: 376, W1: 352, H0: 269, thickness0: 24, thickness1: 8, length: 250 },
        holes: { holeColumn: 2, W01: 230, W02: 125, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-400-8": {
        type: "NSBP",
        panel: { W0: 426, W1: 402, H0: 269, thickness0: 24, thickness1: 8, length: 125 },
        holes: { W01: 280, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },
    "NSBP24-400-16": {
        type: "NSBP",
        panel: { W0: 426, W1: 402, H0: 269, thickness0: 24, thickness1: 8, length: 250 },
        holes: { holeColumn: 2, W01: 280, W02: 125, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 22, bottomHoleRadius: 24 }
    },

    "NSBPI-150-8": {
        type: "NSBPI",
        panel: { W0: 154, H0: 245, thickness: 5, length: 65 },
        holes: { holeColumn: 1, W01: 80, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-150-16": {
        type: "NSBPI",
        panel: { W0: 154, H0: 245, thickness: 5, length: 130 },
        holes: { holeColumn: 2, W01: 80, W02: 65, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-200-8": {
        type: "NSBPI",
        panel: { W0: 204, H0: 245, thickness: 5, length: 75 },
        holes: { holeColumn: 1, W01: 100, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-200-16": {
        type: "NSBPI",
        panel: { W0: 204, H0: 245, thickness: 5, length: 150 },
        holes: { holeColumn: 2, W01: 100, W02: 75, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-250-8": {
        type: "NSBPI",
        panel: { W0: 256, H0: 245, thickness: 5, length: 75 },
        holes: { holeColumn: 1, W01: 130, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-250-16": {
        type: "NSBPI",
        panel: { W0: 256, H0: 245, thickness: 5, length: 150 },
        holes: { holeColumn: 2, W01: 130, W02: 75, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-300-8": {
        type: "NSBPI",
        panel: { W0: 302, H0: 245, thickness: 5, length: 100 },
        holes: { holeColumn: 1, W01: 180, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-300-16": {
        type: "NSBPI",
        panel: { W0: 302, H0: 245, thickness: 5, length: 200 },
        holes: { holeColumn: 2, W01: 180, W02: 100, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },

    "NSBPI-350-8": {
        type: "NSBPI_2",
        panel: { W0: 352, W1: 350, H0: 245, thickness: 5, length: 100, length1: 90 },
        holes: { holeColumn: 1, W01: 230, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-350-16": {
        type: "NSBPI_2",
        panel: { W0: 352, W1: 350, H0: 245, thickness: 5, length: 200, length1: 190 },
        holes: { holeColumn: 2, W01: 230, W02: 125, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-400-8": {
        type: "NSBPI_2",
        panel: { W0: 402, W1: 400, H0: 245, thickness: 5, length: 100, length1: 90 },
        holes: { holeColumn: 1, W01: 280, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },
    "NSBPI-400-16": {
        type: "NSBPI_2",
        panel: { W0: 402, W1: 400, H0: 245, thickness: 5, length: 200, length1: 190 },
        holes: { holeColumn: 2, W01: 280, W02: 125, H01: 35, H02: 55, sideHoleNum: 4, bottomHoleNum: 2, sideHoleRadius: 24, bottomHoleRadius: 20 }
    },

    "NSBP-P100-2": {
        type: "NSBP_P",
        panel: { W0: 200, W1: 89, H0: 300, thickness0: 12, thickness1: 3.5, length: 100 },
        holes: { W01: 140, bottomHoleNum: 2, bottomHoleRadius: 20 }
    },
    "NSBP-P100-4": {
        type: "NSBP_P",
        panel: { W0: 200, W1: 89, H0: 300, thickness0: 12, thickness1: 3.5, length: 200 },
        holes: { W01: 140, bottomHoleNum: 4, bottomHoleRadius: 20 }
    },

    "NSBP-P100-3": {
        type: "NSBP_P2",
        panel: { W0: 200, W1: 100, W2: 89, H0: 300, thickness0: 12, thickness1: 3.5, length0: 100, length1: 200 },
        holes: { W01: 5, W02: 30, H01: 30, H02: 50, bottomHoleRadius: 20 }
    },

    "NSBP-P125-2": {
        type: "NSBP_P125",
        panel: { W0: 130, W1: 100, W2: 15, H0: 300, H1: 10, H2: 250, Wd: 75, Hd: 30, td: 6, thickness0: 12, thickness1: 3.5, length0: 270, length1: 85 },
        holes: { W01: 35, W02: 200, H01: 60, H02: 180, bottomHoleRadius: 20 }
    },

    "NSBP-P125-3": {
        type: "NSBP_P125_2",
        panel: { W0: 129, W1: 100, W2: 27, W3: 228, W4: 18, H0: 300, H1: 10, H2: 250, Wd: 75, Hd: 30, td: 6, thickness0: 12, thickness1: 3.5, length0: 227, length1: 135, length2: 64, length3: 110 },
        holes: { W01: 68, W02: 35, W03: 35, W04: 125, H01: 60, H02: 180, bottomHoleRadius: 20 }
    },

    "NSBP-P125-4-A": {
        type: "NSBP_P125_4",
        panel: { W0: 250, W1: 100, W2: 75, H0: 300, H1: 10, H2: 250, Wd: 75, Hd: 30, td: 6, thickness0: 12, thickness1: 3.5, length0: 250, length1: 75 },
        holes: { W01: 35, W02: 35, W03: 35, H01: 60, H02: 180, bottomHoleRadius: 20 }
    },
    "NSBP-P125-4-B": {
        type: "NSBP_P125_4",
        panel: { W0: 250, W1: 100, W2: 75, H0: 300, H1: 10, H2: 250, Wd: 75, Hd: 30, td: 6, thickness0: 12, thickness1: 3.5, length0: 250, length1: 13 },
        holes: { W01: 35, W02: 50, W03: 35, H01: 60, H02: 180, bottomHoleRadius: 20 }
    },
}

export const BRIGING_APEX_PLATE_SINGLE_SECTIONS_TOP_HAT_SAMPLES = {
    "APBR-100-050": {
        type: "APBR",
        panel: { W0: 249, angle: (170/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-150-050": {
        type: "APBR",
        panel: { W0: 253, angle: (170/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-200-050": {
        type: "APBR",
        panel: { W0: 258, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-250-050": {
        type: "APBR",
        panel: { W0: 262, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-300-050": {
        type: "APBR",
        panel: { W0: 366, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-350-050": {
        type: "APBR",
        panel: { W0: 370, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-400-050": {
        type: "APBR",
        panel: { W0: 375, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-100-075": {
        type: "APBR",
        panel: { W0: 253, angle: (165/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-150-075": {
        type: "APBR",
        panel: { W0: 260, angle: (165/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-200-075": {
        type: "APBR",
        panel: { W0: 256, angle: (165/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-250-075": {
        type: "APBR",
        panel: { W0: 263, angle: (165/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-300-075": {
        type: "APBR",
        panel: { W0: 379, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-350-075": {
        type: "APBR",
        panel: { W0: 386, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-400-075": {
        type: "APBR",
        panel: { W0: 392, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-100-100": {
        type: "APBR",
        panel: { W0: 248, angle: (160/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-150-100": {
        type: "APBR",
        panel: { W0: 257, angle: (160/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-200-100": {
        type: "APBR",
        panel: { W0: 266, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-250-100": {
        type: "APBR",
        panel: { W0: 275, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-300-100": {
        type: "APBR",
        panel: { W0: 385, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-350-100": {
        type: "APBR",
        panel: { W0: 401, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-400-100": {
        type: "APBR",
        panel: { W0: 410, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-100-125": {
        type: "APBR",
        panel: { W0: 252, angle: (155/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-150-125": {
        type: "APBR",
        panel: { W0: 263, angle: (155/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-200-125": {
        type: "APBR",
        panel: { W0: 275, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-250-125": {
        type: "APBR",
        panel: { W0: 281, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-300-125": {
        type: "APBR",
        panel: { W0: 406, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-350-125": {
        type: "APBR",
        panel: { W0: 417, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-400-125": {
        type: "APBR",
        panel: { W0: 428, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-100-150": {
        type: "APBR",
        panel: { W0: 245, angle: (150/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-150-150": {
        type: "APBR",
        panel: { W0: 245, angle: (150/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    }, 
    "APBR-200-150": {
        type: "APBR",
        panel: { W0: 259, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-250-150": {
        type: "APBR",
        panel: { W0: 272, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-300-150": {
        type: "APBR",
        panel: { W0: 420, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-350-150": {
        type: "APBR",
        panel: { W0: 434, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-400-150": {
        type: "APBR",
        panel: { W0: 447, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-100-200": {
        type: "APBR",
        panel: { W0: 242, angle: (140/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-150-200": {
        type: "APBR",
        panel: { W0: 295, angle: (140/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-200-200": {
        type: "APBR",
        panel: { W0: 313, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-250-200": {
        type: "APBR",
        panel: { W0: 332, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-300-200": {
        type: "APBR",
        panel: { W0: 399, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-350-200": {
        type: "APBR",
        panel: { W0: 417, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-400-200": {
        type: "APBR",
        panel: { W0: 435, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-100-225": {
        type: "APBR",
        panel: { W0: 302, angle: (135/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-150-225": {
        type: "APBR",
        panel: { W0: 302, angle: (135/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-200-225": {
        type: "APBR",
        panel: { W0: 323, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-250-225": {
        type: "APBR",
        panel: { W0: 345, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-300-225": {
        type: "APBR",
        panel: { W0: 399, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-350-225": {
        type: "APBR",
        panel: { W0: 435, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-400-225": {
        type: "APBR",
        panel: { W0: 455, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-100-250": {
        type: "APBR",
        panel: { W0: 310, angle: (130/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-150-250": {
        type: "APBR",
        panel: { W0: 310, angle: (130/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },  
    "APBR-200-250": {
        type: "APBR",
        panel: { W0: 334, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-250-250": {
        type: "APBR",
        panel: { W0: 358, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-300-250": {
        type: "APBR",
        panel: { W0: 430, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-350-250": {
        type: "APBR",
        panel: { W0: 453, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-400-250": {
        type: "APBR",
        panel: { W0: 476, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-100-300": {
        type: "APBR",
        panel: { W0: 327, angle: (120/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2  }
    },
    "APBR-150-300": {
        type: "APBR",
        panel: { W0: 327, angle: (120/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2  }
    },
    "APBR-200-300": {
        type: "APBR",
        panel: { W0: 357, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-250-300": {
        type: "APBR",
        panel: { W0: 386, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR-300-300": {
        type: "APBR",
        panel: { W0: 413, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2  }
    },
    "APBR-350-300": {
        type: "APBR",
        panel: { W0: 492, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2  }
    },
    "APBR-400-300": {
        type: "APBR",
        panel: { W0: 521, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    }

}

export const BRIGING_APEX_PLATE_DOUBLE_SECTIONS_TOP_HAT_SAMPLES = {
    "APDBR-100-050": {
        type: "APDBR",
        panel: { W0: 249, angle: (170/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-150-050": {
        type: "APDBR",
        panel: { W0: 253, angle: (170/180)*Math.PI, thickness: 3, length: 128 },
        holes: { W01: 35, W02: 100, L01: 32, L02: 64, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-200-050": {
        type: "APDBR",
        panel: { W0: 258, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-250-050": {
        type: "APDBR",
        panel: { W0: 262, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-300-050": {
        type: "APDBR",
        panel: { W0: 366, angle: (170/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-350-050": {
        type: "APDBR",
        panel: { W0: 370, angle: (170/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-400-050": {
        type: "APDBR",
        panel: { W0: 375, angle: (170/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-050-F96": {
        type: "APDBR",
        panel: { W0: 375, angle: (170/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-100-075": {
        type: "APDBR",
        panel: { W0: 253, angle: (165/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-150-075": {
        type: "APDBR",
        panel: { W0: 260, angle: (165/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-200-075": {
        type: "APDBR",
        panel: { W0: 256, angle: (165/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-250-075": {
        type: "APDBR",
        panel: { W0: 263, angle: (165/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-300-075": {
        type: "APDBR",
        panel: { W0: 379, angle: (165/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-350-075": {
        type: "APDBR",
        panel: { W0: 386, angle: (165/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-075": {
        type: "APDBR",
        panel: { W0: 392, angle: (165/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-075-F96": {
        type: "APDBR",
        panel: { W0: 392, angle: (165/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-100-100": {
        type: "APDBR",
        panel: { W0: 248, angle: (160/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-150-100": {
        type: "APDBR",
        panel: { W0: 257, angle: (160/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-200-100": {
        type: "APDBR",
        panel: { W0: 266, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-250-100": {
        type: "APDBR",
        panel: { W0: 275, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-300-100": {
        type: "APDBR",
        panel: { W0: 385, angle: (160/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-350-100": {
        type: "APDBR",
        panel: { W0: 401, angle: (160/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-100": {
        type: "APDBR",
        panel: { W0: 410, angle: (160/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-400-100-F96": {
        type: "APDBR",
        panel: { W0: 410, angle: (160/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-100-125": {
        type: "APDBR",
        panel: { W0: 252, angle: (155/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-150-125": {
        type: "APDBR",
        panel: { W0: 263, angle: (155/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-200-125": {
        type: "APDBR",
        panel: { W0: 275, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-250-125": {
        type: "APDBR",
        panel: { W0: 281, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-300-125": {
        type: "APDBR",
        panel: { W0: 406, angle: (155/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-350-125": {
        type: "APDBR",
        panel: { W0: 417, angle: (155/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-125": {
        type: "APDBR",
        panel: { W0: 428, angle: (155/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-400-125-F96": {
        type: "APDBR",
        panel: { W0: 428, angle: (155/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-100-150": {
        type: "APDBR",
        panel: { W0: 245, angle: (150/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-150-150": {
        type: "APDBR",
        panel: { W0: 245, angle: (150/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-200-150": {
        type: "APDBR",
        panel: { W0: 259, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-250-150": {
        type: "APDBR",
        panel: { W0: 272, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-300-150": {
        type: "APDBR",
        panel: { W0: 420, angle: (150/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-350-150": {
        type: "APDBR",
        panel: { W0: 434, angle: (150/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-150": {
        type: "APDBR",
        panel: { W0: 447, angle: (150/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-150-F96": {
        type: "APDBR",
        panel: { W0: 447, angle: (150/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-100-200": {
        type: "APDBR",
        panel: { W0: 242, angle: (140/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-150-200": {
        type: "APDBR",
        panel: { W0: 295, angle: (140/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-200-200": {
        type: "APDBR",
        panel: { W0: 313, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-250-200": {
        type: "APDBR",
        panel: { W0: 332, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-300-200": {
        type: "APDBR",
        panel: { W0: 399, angle: (140/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-350-200": {
        type: "APDBR",
        panel: { W0: 417, angle: (140/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-200": {
        type: "APDBR",
        panel: { W0: 435, angle: (140/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-200-F96": {
        type: "APDBR",
        panel: { W0: 435, angle: (140/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-100-225": {
        type: "APDBR",
        panel: { W0: 302, angle: (135/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-150-225": {
        type: "APDBR",
        panel: { W0: 302, angle: (135/180)*Math.PI, thickness: 3, length: 136 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-200-225": {
        type: "APDBR",
        panel: { W0: 323, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-250-225": {
        type: "APDBR",
        panel: { W0: 345, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-300-225": {
        type: "APDBR",
        panel: { W0: 399, angle: (135/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-350-225": {
        type: "APDBR",
        panel: { W0: 435, angle: (135/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-225": {
        type: "APDBR",
        panel: { W0: 455, angle: (135/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-225-F96": {
        type: "APDBR",
        panel: { W0: 455, angle: (135/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-100-250": {
        type: "APDBR",
        panel: { W0: 310, angle: (130/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-150-250": {
        type: "APDBR",
        panel: { W0: 310, angle: (130/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-200-250": {
        type: "APDBR",
        panel: { W0: 334, angle: (130/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-250-250": {
        type: "APDBR",
        panel: { W0: 358, angle: (130/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-300-250": {
        type: "APDBR",
        panel: { W0: 430, angle: (130/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-350-250": {
        type: "APDBR",
        panel: { W0: 453, angle: (130/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-250": {
        type: "APDBR",
        panel: { W0: 453, angle: (130/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-400-250-F96": {
        type: "APDBR",
        panel: { W0: 476, angle: (130/180)*Math.PI, thickness: 3, length: 176 },
        holes: { W01: 35, W02: 150, L01: 40, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-100-300": {
        type: "APDBR",
        panel: { W0: 327, angle: (120/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-150-300": {
        type: "APDBR",
        panel: { W0: 327, angle: (120/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-200-300": {
        type: "APDBR",
        panel: { W0: 357, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-250-300": {
        type: "APDBR",
        panel: { W0: 386, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR-350-300": {
        type: "APDBR",
        panel: { W0: 492, angle: (120/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 100, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR-400-300": {
        type: "APDBR",
        panel: { W0: 521, angle: (120/180)*Math.PI, thickness: 3, length: 205 },
        holes: { W01: 35, W02: 100, L01: 40, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    }
}

export const BRIGING_APEX_PLATE_SINGLE_SECTIONS_Z_SECTION_SAMPLES = {
    "APBR100-Z10-050": {
        type: "APBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 107, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z10-050": {
        type: "APBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z10-050": {
        type: "APBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z10-050": {
        type: "APBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 93, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z10-050": {
        type: "APBR",
        panel: { W0: 252, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 61, W03: 89, L01: 47,  radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z10-050": {
        type: "APBR",
        panel: { W0: 406, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 65, W04: 85, L01: 47,  radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z10-050": {
        type: "APBR",
        panel: { W0: 410, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 69, W04: 81, L01: 47,  radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z15-050": {
        type: "APBR",
        panel: { W0: 189, angle: (170/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z15-050": {
        type: "APBR",
        panel: { W0: 189, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 96, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z15-050": {
        type: "APBR",
        panel: { W0: 189, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 91, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z15-050": {
        type: "APBR",
        panel: { W0: 252, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 61, W03: 89, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z15-050": {
        type: "APBR",
        panel: { W0: 406, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 65, W04: 85, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z15-050": {
        type: "APBR",
        panel: { W0: 410, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 69, W04: 81, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z20-050": {
        type: "APBR",
        panel: { W0: 194, angle: (170/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 106, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z20-050": {
        type: "APBR",
        panel: { W0: 194, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 106, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z20-050": {
        type: "APBR",
        panel: { W0: 194, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 97, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z20-050": {
        type: "APBR",
        panel: { W0: 252, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 57, W03: 93, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z20-050": {
        type: "APBR",
        panel: { W0: 406, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 65, W04: 85, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z20-050": {
        type: "APBR",
        panel: { W0: 410, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 69, W04: 81, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z25-050": {
        type: "APBR",
        panel: { W0: 189, angle: (170/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z25-050": {
        type: "APBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 98, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z25-050": {
        type: "APBR",
        panel: { W0: 190, angle: (170/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 93, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z25-050": {
        type: "APBR",
        panel: { W0: 252, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 60, W03: 90, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z25-050": {
        type: "APBR",
        panel: { W0: 406, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 65, W04: 85, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z25-050": {
        type: "APBR",
        panel: { W0: 410, angle: (170/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 69, W04: 81, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR100-Z10-075": {
        type: "APBR",
        panel: { W0: 188, angle: (165/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z10-075": {
        type: "APBR",
        panel: { W0: 186, angle: (167/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 91, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z10-075": {
        type: "APBR",
        panel: { W0: 186, angle: (166/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 84, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z10-075": {
        type: "APBR",
        panel: { W0: 259, angle: (165/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 70, W03: 80, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z10-075": {
        type: "APBR",
        panel: { W0: 265, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 77, W03: 73, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z10-075": {
        type: "APBR",
        panel: { W0: 422, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 83, W04: 67, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z10-075": {
        type: "APBR",
        panel: { W0: 428, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 90, W04: 60, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z15-075": {
        type: "APBR",
        panel: { W0: 183, angle: (167/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 88, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z15-075": {
        type: "APBR",
        panel: { W0: 183, angle: (166/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 81, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z15-075": {
        type: "APBR",
        panel: { W0: 259, angle: (165/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 75, W03: 75, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z15-075": {
        type: "APBR",
        panel: { W0: 265, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 82, W03: 68, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z15-075": {
        type: "APBR",
        panel: { W0: 421, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 88, W04: 62, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z15-075": {
        type: "APBR",
        panel: { W0: 428, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 95, W04: 55, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z20-075": {
        type: "APBR",
        panel: { W0: 183, angle: (165/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 88, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z20-075": {
        type: "APBR",
        panel: { W0: 183, angle: (166/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 81, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z20-075": {
        type: "APBR",
        panel: { W0: 259, angle: (165/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 75, W03: 75, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z20-075": {
        type: "APBR",
        panel: { W0: 265, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 82, W03: 68, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z20-075": {
        type: "APBR",
        panel: { W0: 421, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 88, W04: 62, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z20-075": {
        type: "APBR",
        panel: { W0: 428, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 95, W04: 55, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z25-075": {
        type: "APBR",
        panel: { W0: 178, angle: (165/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 83, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z25-075": {
        type: "APBR",
        panel: { W0: 183, angle: (165/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 40, W02: 76, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z25-075": {
        type: "APBR",
        panel: { W0: 259, angle: (165/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 80, W03: 70, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z25-075": {
        type: "APBR",
        panel: { W0: 265, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 87, W03: 63, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z25-075": {
        type: "APBR",
        panel: { W0: 421, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 93, W04: 57, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z25-075": {
        type: "APBR",
        panel: { W0: 428, angle: (165/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 100, W04: 50, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR100-Z10-100": {
        type: "APBR",
        panel: { W0: 282, angle: (160/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z10-100": {
        type: "APBR",
        panel: { W0: 282, angle: (160/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z10-100": {
        type: "APBR",
        panel: { W0: 276, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z10-100": {
        type: "APBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 150, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z10-100": {
        type: "APBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z10-100": {
        type: "APBR",
        panel: { W0: 476, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z10-100": {
        type: "APBR",
        panel: { W0: 482, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z15-100": {
        type: "APBR",
        panel: { W0: 277, angle: (160/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z15-100": {
        type: "APBR",
        panel: { W0: 276, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z15-100": {
        type: "APBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 150, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z15-100": {
        type: "APBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z15-100": {
        type: "APBR",
        panel: { W0: 476, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z15-100": {
        type: "APBR",
        panel: { W0: 477, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z20-100": {
        type: "APBR",
        panel: { W0: 277, angle: (160/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z20-100": {
        type: "APBR",
        panel: { W0: 276, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z20-100": {
        type: "APBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 150, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z20-100": {
        type: "APBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z20-100": {
        type: "APBR",
        panel: { W0: 476, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z20-100": {
        type: "APBR",
        panel: { W0: 477, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z25-100": {
        type: "APBR",
        panel: { W0: 303, angle: (160/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 136, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z25-100": {
        type: "APBR",
        panel: { W0: 311, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 145, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z25-100": {
        type: "APBR",
        panel: { W0: 316, angle: (160/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 145, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z25-100": {
        type: "APBR",
        panel: { W0: 316, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z25-100": {
        type: "APBR",
        panel: { W0: 466, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z25-100": {
        type: "APBR",
        panel: { W0: 467, angle: (160/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 158, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z10-125": {
        type: "APBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z10-125": {
        type: "APBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z10-125": {
        type: "APBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 150, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z10-125": {
        type: "APBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z10-125": {
        type: "APBR",
        panel: { W0: 477, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z10-125": {
        type: "APBR",
        panel: { W0: 477, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z15-125": {
        type: "APBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z15-125": {
        type: "APBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z15-125": {
        type: "APBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 150, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z15-125": {
        type: "APBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z15-125": {
        type: "APBR",
        panel: { W0: 470, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z15-125": {
        type: "APBR",
        panel: { W0: 470, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z20-125": {
        type: "APBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z20-125": {
        type: "APBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 100, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z20-125": {
        type: "APBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 150, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z20-125": {
        type: "APBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z20-125": {
        type: "APBR",
        panel: { W0: 470, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z20-125": {
        type: "APBR",
        panel: { W0: 470, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z25-125": {
        type: "APBR",
        panel: { W0: 306, angle: (155/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 150, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z25-125": {
        type: "APBR",
        panel: { W0: 306, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 150, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z25-125": {
        type: "APBR",
        panel: { W0: 306, angle: (155/180)*Math.PI, thickness: 3, length: 74 },
        holes: { W01: 35, W02: 150, L01: 37, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z25-125": {
        type: "APBR",
        panel: { W0: 304, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z25-125": {
        type: "APBR",
        panel: { W0: 456, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z25-125": {
        type: "APBR",
        panel: { W0: 456, angle: (155/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR100-Z10-150": {
        type: "APBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z10-150": {
        type: "APBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z10-150": {
        type: "APBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z10-150": {
        type: "APBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z10-150": {
        type: "APBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z10-150": {
        type: "APBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z10-150": {
        type: "APBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z15-150": {
        type: "APBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z15-150": {
        type: "APBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z15-150": {
        type: "APBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z15-150": {
        type: "APBR",
        panel: { W0: 333, angle: (151/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z15-150": {
        type: "APBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z15-150": {
        type: "APBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z20-150": {
        type: "APBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z20-150": {
        type: "APBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z20-150": {
        type: "APBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z20-150": {
        type: "APBR",
        panel: { W0: 333, angle: (151/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z20-150": {
        type: "APBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z20-150": {
        type: "APBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z25-150": {
        type: "APBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 150, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z25-150": {
        type: "APBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z25-150": {
        type: "APBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z25-150": {
        type: "APBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z25-150": {
        type: "APBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z25-150": {
        type: "APBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR100-Z10-200": {
        type: "APBR",
        panel: { W0: 314, angle: (140/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 91, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z10-200": {
        type: "APBR",
        panel: { W0: 332, angle: (140/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 109, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z10-200": {
        type: "APBR",
        panel: { W0: 332, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 109, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z10-200": {
        type: "APBR",
        panel: { W0: 350, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 127, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z10-200": {
        type: "APBR",
        panel: { W0: 373, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z10-200": {
        type: "APBR",
        panel: { W0: 523, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z10-200": {
        type: "APBR",
        panel: { W0: 523, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z15-200": {
        type: "APBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z15-200": {
        type: "APBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z15-200": {
        type: "APBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z15-200": {
        type: "APBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z15-200": {
        type: "APBR",
        panel: { W0: 523, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z15-200": {
        type: "APBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z20-200": {
        type: "APBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z20-200": {
        type: "APBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z20-200": {
        type: "APBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z20-200": {
        type: "APBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z20-200": {
        type: "APBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z20-200": {
        type: "APBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z25-200": {
        type: "APBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z25-200": {
        type: "APBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z25-200": {
        type: "APBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z25-200": {
        type: "APBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z25-200": {
        type: "APBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z25-200": {
        type: "APBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR100-Z10-225": {
        type: "APBR",
        panel: { W0: 342, angle: (136/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z10-225": {
        type: "APBR",
        panel: { W0: 342, angle: (136/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z10-225": {
        type: "APBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z10-225": {
        type: "APBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z10-225": {
        type: "APBR",
        panel: { W0: 391, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z10-225": {
        type: "APBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z10-225": {
        type: "APBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z15-225": {
        type: "APBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z15-225": {
        type: "APBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z15-225": {
        type: "APBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z15-225": {
        type: "APBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z15-225": {
        type: "APBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z15-225": {
        type: "APBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z20-225": {
        type: "APBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z20-225": {
        type: "APBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z20-225": {
        type: "APBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z20-225": {
        type: "APBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z20-225": {
        type: "APBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z20-225": {
        type: "APBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z25-225": {
        type: "APBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 150, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z25-225": {
        type: "APBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z25-225": {
        type: "APBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z25-225": {
        type: "APBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z25-225": {
        type: "APBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z25-225": {
        type: "APBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR100-Z10-250": {
        type: "APBR",
        panel: { W0: 264, angle: (130/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 116, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z10-250": {
        type: "APBR",
        panel: { W0: 264, angle: (130/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 116, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z10-250": {
        type: "APBR",
        panel: { W0: 364, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z10-250": {
        type: "APBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z10-250": {
        type: "APBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z10-250": {
        type: "APBR",
        panel: { W0: 564, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z10-250": {
        type: "APBR",
        panel: { W0: 563, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z15-250": {
        type: "APBR",
        panel: { W0: 264, angle: (130/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 116, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z15-250": {
        type: "APBR",
        panel: { W0: 264, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 116, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z15-250": {
        type: "APBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z15-250": {
        type: "APBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z15-250": {
        type: "APBR",
        panel: { W0: 564, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z15-250": {
        type: "APBR",
        panel: { W0: 563, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z20-250": {
        type: "APBR",
        panel: { W0: 364, angle: (130/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z20-250": {
        type: "APBR",
        panel: { W0: 364, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z20-250": {
        type: "APBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z20-250": {
        type: "APBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z20-250": {
        type: "APBR",
        panel: { W0: 564, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z20-250": {
        type: "APBR",
        panel: { W0: 563, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z25-250": {
        type: "APBR",
        panel: { W0: 364, angle: (130/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z25-250": {
        type: "APBR",
        panel: { W0: 364, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z25-250": {
        type: "APBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z25-250": {
        type: "APBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z25-250": {
        type: "APBR",
        panel: { W0: 564, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z25-250": {
        type: "APBR",
        panel: { W0: 563, angle: (130/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR100-Z10-300": {
        type: "APBR",
        panel: { W0: 309, angle: (120/180)*Math.PI, thickness: 3, length: 50 },
        holes: { W01: 35, W02: 100, L01: 25, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z10-300": {
        type: "APBR",
        panel: { W0: 408, angle: (120/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, W03: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z10-300": {
        type: "APBR",
        panel: { W0: 408, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, W03: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z10-300": {
        type: "APBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z10-300": {
        type: "APBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z10-300": {
        type: "APBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z10-300": {
        type: "APBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z15-300": {
        type: "APBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z15-300": {
        type: "APBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z15-300": {
        type: "APBR",
        panel: { W0: 459, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z15-300": {
        type: "APBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z15-300": {
        type: "APBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z15-300": {
        type: "APBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z20-300": {
        type: "APBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z20-300": {
        type: "APBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z20-300": {
        type: "APBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z20-300": {
        type: "APBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z20-300": {
        type: "APBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z20-300": {
        type: "APBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR150-Z25-300": {
        type: "APBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 64 },
        holes: { W01: 35, W02: 100, L01: 32, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR200-Z25-300": {
        type: "APBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 100, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR250-Z25-300": {
        type: "APBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 76 },
        holes: { W01: 35, W02: 150, L01: 38, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR300-Z25-300": {
        type: "APBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR350-Z25-300": {
        type: "APBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    },
    "APBR400-Z25-300": {
        type: "APBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 94 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 47, radiusX: 30/2, radiusY: 18/2 }
    }
}

export const BRIGING_APEX_PLATE_DOUBLE_SECTIONS_Z_SECTION_SAMPLES = {
    "APDBR100-Z10-050": {
        type: "APDBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 114 },
        holes: { W01: 35, W02: 107, L01: 32, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z10-050": {
        type: "APDBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z10-050": {
        type: "APDBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR250-Z10-050": {
        type: "APDBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 93, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z10-050": {
        type: "APDBR",
        panel: { W0: 252, angle: (170/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 61, W03: 89, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR350-Z10-050": {
        type: "APDBR",
        panel: { W0: 406, angle: (170/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 65, W04: 85, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z10-050": {
        type: "APDBR",
        panel: { W0: 410, angle: (170/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 69, W04: 81, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z15-050": {
        type: "APDBR",
        panel: { W0: 189, angle: (170/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z15-050": {
        type: "APDBR",
        panel: { W0: 189, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 96, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z15-050": {
        type: "APDBR",
        panel: { W0: 189, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 91, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR300-Z15-050": {
        type: "APDBR",
        panel: { W0: 252, angle: (170/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 61, W03: 89, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR350-Z15-050": {
        type: "APDBR",
        panel: { W0: 406, angle: (170/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 65, W04: 85, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z15-050": {
        type: "APDBR",
        panel: { W0: 410, angle: (170/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 69, W04: 81, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR150-Z20-050": {
        type: "APDBR",
        panel: { W0: 194, angle: (170/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 106, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z20-050": {
        type: "APDBR",
        panel: { W0: 194, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 101, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z20-050": {
        type: "APDBR",
        panel: { W0: 194, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 97, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z20-050": {
        type: "APDBR",
        panel: { W0: 252, angle: (170/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 57, W03: 93, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z20-050": {
        type: "APDBR",
        panel: { W0: 406, angle: (170/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 65, W04: 85, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z20-050": {
        type: "APDBR",
        panel: { W0: 410, angle: (170/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 69, W04: 81, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z25-050": {
        type: "APDBR",
        panel: { W0: 189, angle: (170/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR200-Z25-050": {
        type: "APDBR",
        panel: { W0: 191, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 98, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z25-050": {
        type: "APDBR",
        panel: { W0: 190, angle: (170/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 93, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z25-050": {
        type: "APDBR",
        panel: { W0: 252, angle: (170/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 60, W03: 90, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z25-050": {
        type: "APDBR",
        panel: { W0: 406, angle: (170/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 65, W04: 85, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z25-050": {
        type: "APDBR",
        panel: { W0: 410, angle: (170/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 69, W04: 81, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR100-Z10-075": {
        type: "APDBR",
        panel: { W0: 188, angle: (165/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z10-075": {
        type: "APDBR",
        panel: { W0: 186, angle: (167/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 91, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z10-075": {
        type: "APDBR",
        panel: { W0: 186, angle: (166/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 84, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z10-075": {
        type: "APDBR",
        panel: { W0: 259, angle: (165/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 70, W03: 80, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z10-075": {
        type: "APDBR",
        panel: { W0: 265, angle: (165/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 77, W03: 73, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR350-Z10-075": {
        type: "APDBR",
        panel: { W0: 421, angle: (165/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 83, W04: 67, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z10-075": {
        type: "APDBR",
        panel: { W0: 428, angle: (165/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 90, W04: 60, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z15-075": {
        type: "APDBR",
        panel: { W0: 183, angle: (167/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 88, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z15-075": {
        type: "APDBR",
        panel: { W0: 183, angle: (166/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 81, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z15-075": {
        type: "APDBR",
        panel: { W0: 259, angle: (165/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 75, W03: 75, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z15-075": {
        type: "APDBR",
        panel: { W0: 265, angle: (165/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 82, W03: 68, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z15-075": {
        type: "APDBR",
        panel: { W0: 421, angle: (165/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 88, W04: 62, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z15-075": {
        type: "APDBR",
        panel: { W0: 428, angle: (165/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 95, W04: 55, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z20-075": {
        type: "APDBR",
        panel: { W0: 183, angle: (167/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 88, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z20-075": {
        type: "APDBR",
        panel: { W0: 183, angle: (166/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 81, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z20-075": {
        type: "APDBR",
        panel: { W0: 259, angle: (165/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 75, W03: 75, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z20-075": {
        type: "APDBR",
        panel: { W0: 265, angle: (165/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 82, W03: 68, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z20-075": {
        type: "APDBR",
        panel: { W0: 421, angle: (165/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 88, W04: 62, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z20-075": {
        type: "APDBR",
        panel: { W0: 428, angle: (165/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 95, W04: 55, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z25-075": {
        type: "APDBR",
        panel: { W0: 178, angle: (165/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 83, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z25-075": {
        type: "APDBR",
        panel: { W0: 183, angle: (166/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 40, W02: 76, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z25-075": {
        type: "APDBR",
        panel: { W0: 259, angle: (166/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 80, W03: 70, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z25-075": {
        type: "APDBR",
        panel: { W0: 265, angle: (166/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 87, W03: 63, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z25-075": {
        type: "APDBR",
        panel: { W0: 421, angle: (166/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 93, W04: 57, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z25-075": {
        type: "APDBR",
        panel: { W0: 428, angle: (166/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 100, W04: 50, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR100-Z10-100": {
        type: "APDBR",
        panel: { W0: 282, angle: (160/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z10-100": {
        type: "APDBR",
        panel: { W0: 282, angle: (160/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z10-100": {
        type: "APDBR",
        panel: { W0: 276, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z10-100": {
        type: "APDBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z10-100": {
        type: "APDBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z10-100": {
        type: "APDBR",
        panel: { W0: 476, angle: (160/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z10-100": {
        type: "APDBR",
        panel: { W0: 482, angle: (160/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z15-100": {
        type: "APDBR",
        panel: { W0: 277, angle: (160/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z15-100": {
        type: "APDBR",
        panel: { W0: 276, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z15-100": {
        type: "APDBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z15-100": {
        type: "APDBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z15-100": {
        type: "APDBR",
        panel: { W0: 476, angle: (160/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z15-100": {
        type: "APDBR",
        panel: { W0: 477, angle: (160/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z20-100": {
        type: "APDBR",
        panel: { W0: 277, angle: (160/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z20-100": {
        type: "APDBR",
        panel: { W0: 276, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z20-100": {
        type: "APDBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 30, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z20-100": {
        type: "APDBR",
        panel: { W0: 326, angle: (160/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z20-100": {
        type: "APDBR",
        panel: { W0: 476, angle: (160/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z20-100": {
        type: "APDBR",
        panel: { W0: 477, angle: (160/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z25-100": {
        type: "APDBR",
        panel: { W0: 303, angle: (160/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 136, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z25-100": {
        type: "APDBR",
        panel: { W0: 311, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 145, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z25-100": {
        type: "APDBR",
        panel: { W0: 316, angle: (160/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z25-100": {
        type: "APDBR",
        panel: { W0: 316, angle: (160/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z25-100": {
        type: "APDBR",
        panel: { W0: 466, angle: (160/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z25-100": {
        type: "APDBR",
        panel: { W0: 467, angle: (160/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 158, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR100-Z10-125": {
        type: "APDBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z10-125": {
        type: "APDBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z10-125": {
        type: "APDBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z10-125": {
        type: "APDBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z10-125": {
        type: "APDBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z10-125": {
        type: "APDBR",
        panel: { W0: 477, angle: (155/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z10-125": {
        type: "APDBR",
        panel: { W0: 477, angle: (155/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z15-125": {
        type: "APDBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z15-125": {
        type: "APDBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z15-125": {
        type: "APDBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z15-125": {
        type: "APDBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z15-125": {
        type: "APDBR",
        panel: { W0: 470, angle: (155/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z15-125": {
        type: "APDBR",
        panel: { W0: 470, angle: (155/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z20-125": {
        type: "APDBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z20-125": {
        type: "APDBR",
        panel: { W0: 270, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z20-125": {
        type: "APDBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z20-125": {
        type: "APDBR",
        panel: { W0: 320, angle: (155/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z20-125": {
        type: "APDBR",
        panel: { W0: 470, angle: (155/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z20-125": {
        type: "APDBR",
        panel: { W0: 470, angle: (155/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z25-125": {
        type: "APDBR",
        panel: { W0: 306, angle: (155/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 150, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z25-125": {
        type: "APDBR",
        panel: { W0: 306, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z25-125": {
        type: "APDBR",
        panel: { W0: 306, angle: (155/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z25-125": {
        type: "APDBR",
        panel: { W0: 304, angle: (155/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z25-125": {
        type: "APDBR",
        panel: { W0: 456, angle: (155/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z25-125": {
        type: "APDBR",
        panel: { W0: 456, angle: (155/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR100-Z10-150": {
        type: "APDBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z10-150": {
        type: "APDBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z10-150": {
        type: "APDBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z10-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z10-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (151/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z10-150": {
        type: "APDBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z10-150": {
        type: "APDBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z15-150": {
        type: "APDBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z15-150": {
        type: "APDBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z15-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR300-Z15-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z15-150": {
        type: "APDBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z15-150": {
        type: "APDBR",
        panel: { W0: 463, angle: (150/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z20-150": {
        type: "APDBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z20-150": {
        type: "APDBR",
        panel: { W0: 283, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z20-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z20-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z20-150": {
        type: "APDBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z20-150": {
        type: "APDBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z25-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 150, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z25-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z25-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (150/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z25-150": {
        type: "APDBR",
        panel: { W0: 333, angle: (151/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z25-150": {
        type: "APDBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z25-150": {
        type: "APDBR",
        panel: { W0: 483, angle: (150/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR100-Z10-200": {
        type: "APDBR",
        panel: { W0: 314, angle: (140/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 91, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z10-200": {
        type: "APDBR",
        panel: { W0: 332, angle: (140/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 109, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z10-200": {
        type: "APDBR",
        panel: { W0: 332, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 109, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z10-200": {
        type: "APDBR",
        panel: { W0: 373, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z10-200": {
        type: "APDBR",
        panel: { W0: 373, angle: (140/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z10-200": {
        type: "APDBR",
        panel: { W0: 523, angle: (140/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z10-200": {
        type: "APDBR",
        panel: { W0: 523, angle: (140/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z15-200": {
        type: "APDBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z15-200": {
        type: "APDBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z15-200": {
        type: "APDBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z15-200": {
        type: "APDBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z15-200": {
        type: "APDBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z15-200": {
        type: "APDBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z20-200": {
        type: "APDBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z20-200": {
        type: "APDBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z20-200": {
        type: "APDBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z20-200": {
        type: "APDBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR350-Z20-200": {
        type: "APDBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z20-200": {
        type: "APDBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z25-200": {
        type: "APDBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z25-200": {
        type: "APDBR",
        panel: { W0: 322, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z25-200": {
        type: "APDBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z25-200": {
        type: "APDBR",
        panel: { W0: 372, angle: (140/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z25-200": {
        type: "APDBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z25-200": {
        type: "APDBR",
        panel: { W0: 522, angle: (140/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR100-Z10-225": {
        type: "APDBR",
        panel: { W0: 342, angle: (136/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z10-225": {
        type: "APDBR",
        panel: { W0: 342, angle: (136/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z10-225": {
        type: "APDBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z10-225": {
        type: "APDBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z10-225": {
        type: "APDBR",
        panel: { W0: 391, angle: (135/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z10-225": {
        type: "APDBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z10-225": {
        type: "APDBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z15-225": {
        type: "APDBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z15-225": {
        type: "APDBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z15-225": {
        type: "APDBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z15-225": {
        type: "APDBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z15-225": {
        type: "APDBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z15-225": {
        type: "APDBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z20-225": {
        type: "APDBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z20-225": {
        type: "APDBR",
        panel: { W0: 342, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z20-225": {
        type: "APDBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z20-225": {
        type: "APDBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z20-225": {
        type: "APDBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z20-225": {
        type: "APDBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z25-225": {
        type: "APDBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 150, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z25-225": {
        type: "APDBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z25-225": {
        type: "APDBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z25-225": {
        type: "APDBR",
        panel: { W0: 392, angle: (135/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z25-225": {
        type: "APDBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z25-225": {
        type: "APDBR",
        panel: { W0: 542, angle: (135/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR100-Z10-250": {
        type: "APDBR",
        panel: { W0: 264, angle: (130/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 116, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z10-250": {
        type: "APDBR",
        panel: { W0: 264, angle: (130/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 116, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z10-250": {
        type: "APDBR",
        panel: { W0: 364, angle: (131/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z10-250": {
        type: "APDBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z10-250": {
        type: "APDBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z10-250": {
        type: "APDBR",
        panel: { W0: 564, angle: (130/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z10-250": {
        type: "APDBR",
        panel: { W0: 563, angle: (130/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z15-250": {
        type: "APDBR",
        panel: { W0: 264, angle: (130/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 116, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z15-250": {
        type: "APDBR",
        panel: { W0: 264, angle: (130/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 116, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z15-250": {
        type: "APDBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z15-250": {
        type: "APDBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z15-250": {
        type: "APDBR",
        panel: { W0: 564, angle: (130/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z15-250": {
        type: "APDBR",
        panel: { W0: 563, angle: (130/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z20-250": {
        type: "APDBR",
        panel: { W0: 364, angle: (130/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z20-250": {
        type: "APDBR",
        panel: { W0: 364, angle: (130/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z20-250": {
        type: "APDBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z20-250": {
        type: "APDBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z20-250": {
        type: "APDBR",
        panel: { W0: 564, angle: (130/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z20-250": {
        type: "APDBR",
        panel: { W0: 563, angle: (130/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z25-250": {
        type: "APDBR",
        panel: { W0: 364, angle: (130/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z25-250": {
        type: "APDBR",
        panel: { W0: 364, angle: (130/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z25-250": {
        type: "APDBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z25-250": {
        type: "APDBR",
        panel: { W0: 414, angle: (130/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z25-250": {
        type: "APDBR",
        panel: { W0: 564, angle: (130/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z25-250": {
        type: "APDBR",
        panel: { W0: 563, angle: (130/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR100-Z10-300": {
        type: "APDBR",
        panel: { W0: 309, angle: (120/180)*Math.PI, thickness: 3, length: 100 },
        holes: { W01: 35, W02: 100, L01: 25, L02: 50, radiusX: 30/2, radiusY: 18/2  }
    },
    "APDBR150-Z10-300": {
        type: "APDBR",
        panel: { W0: 408, angle: (120/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, W03: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z10-300": {
        type: "APDBR",
        panel: { W0: 408, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, W03: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z10-300": {
        type: "APDBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z10-300": {
        type: "APDBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z10-300": {
        type: "APDBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z10-300": {
        type: "APDBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z15-300": {
        type: "APDBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z15-300": {
        type: "APDBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z15-300": {
        type: "APDBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z15-300": {
        type: "APDBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z15-300": {
        type: "APDBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z15-300": {
        type: "APDBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z20-300": {
        type: "APDBR",
        panel: { W0: 309, angle: (120/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z20-300": {
        type: "APDBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z20-300": {
        type: "APDBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z20-300": {
        type: "APDBR",
        panel: { W0: 400, angle: (120/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, W03: 155, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z20-300": {
        type: "APDBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z20-300": {
        type: "APDBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR150-Z25-300": {
        type: "APDBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 124 },
        holes: { W01: 35, W02: 100, L01: 30, L02: 64, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR200-Z25-300": {
        type: "APDBR",
        panel: { W0: 308, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 100, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR250-Z25-300": {
        type: "APDBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 146 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 76, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR300-Z25-300": {
        type: "APDBR",
        panel: { W0: 458, angle: (120/180)*Math.PI, thickness: 3, length: 166 },
        holes: { W01: 35, W02: 150, L01: 35, L02: 96, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR350-Z25-300": {
        type: "APDBR",
        panel: { W0: 580, angle: (120/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, W04: 185, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    },
    "APDBR400-Z25-300": {
        type: "APDBR",
        panel: { W0: 608, angle: (120/180)*Math.PI, thickness: 3, length: 195 },
        holes: { W01: 35, W02: 150, W03: 150, W04: 213, L01: 35, L02: 125, radiusX: 30/2, radiusY: 18/2 }
    }
}