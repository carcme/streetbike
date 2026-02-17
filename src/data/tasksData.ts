const tasksData = {
  project: "Rebuild Timeline",
  model_type: "Type 248 (Short-Stroke Airhead)",
  tag: ["Discovered in the Dust ", "Rebuilt for the Redline"],
  timeline: [
    {
      phase: 1,
      title: "Documentation & Disassembly",
      duration: "1-2 Weeks",
      img: "shedbike.jpeg",
      imgAlt: "",
      tasks: [
        {
          id: "1.1",
          task: "Photographic Documentation",
          details: "Focus on cable routing and wiring harness paths.",
          status: "completed",
        },
        {
          id: "1.2",
          task: "Fluid Evacuation",
          details:
            "Drain engine, transmission, driveshaft, and final drive oils.",
          status: "completed",
        },
        {
          id: "1.3",
          task: "Major Component Removal",
          details: "Remove seat, tank, battery, exhaust, and carburetors.",
          status: "completed",
        },
        {
          id: "1.4",
          task: "Wiring Harvest",
          details: "Label every plug on the loom before disconnecting.",
          status: "completed",
        },
        {
          id: "1.5",
          task: "Engine Extraction",
          details: "Pull engine and transmission as a unit or separately.",
          status: "completed",
        },
      ],
    },
    {
      phase: 2,
      title: "Frame & Aesthetics",
      duration: "3-6 Weeks",
      img: "",
      imgAlt: "",
      tasks: [
        {
          id: "2.1",
          task: "Structural Inspection",
          details: "Check for cracks near side-stand and subframe mounts.",
          status: "pending",
        },
        {
          id: "2.2",
          task: "Powder Coating/Paint",
          details: "Send frame, subframe, and swingarm for refinishing.",
          status: "pending",
        },
        {
          id: "2.3",
          task: "Fuel Tank Restoration",
          details: "Inspect for internal rust; apply liner if necessary.",
          status: "completed",
        },
        {
          id: "2.4",
          task: "Hardware Refurbishment",
          details:
            "Clean original bolts; replace fasteners with high-tensile plated steel.",
          status: "pending",
        },
      ],
    },
    {
      phase: 3,
      title: "Engine & Drivetrain",
      duration: "4-8 Weeks",
      img: "engine.png",
      imgAlt: "Engine",
      tasks: [
        {
          id: "3.1",
          task: "Top End Overhaul",
          details:
            "Measure piston-to-wall clearance; replace pushrod tube seals.",
          status: "pending",
        },
        {
          id: "3.2",
          task: "Cylinder Head Service",
          details:
            "Inspect valve seats; evaluate for unleaded fuel conversion.",
          technical_notes:
            "Valve Clearances: $0.10mm$ Intake / $0.15mm$ Exhaust",
          status: "pending",
        },
        {
          id: "3.3",
          task: "Bottom End Inspection",
          details: "Replace rear main seal and oil pump O-ring.",
          status: "pending",
        },
        {
          id: "3.4",
          task: "Transmission & Clutch",
          details:
            "Inspect friction disk; grease input splines with Staburags NBU 30 PTM.",
          status: "pending",
        },
      ],
    },
    {
      phase: 4,
      title: "Rolling Chassis Reassembly",
      duration: "2-3 Weeks",
      img: "roliing.avif",
      imgAlt: "Rolling Chassis",
      tasks: [
        {
          id: "4.1",
          task: "Bearing Installation",
          details: "Press in new steering head and swingarm pivot bearings.",
          status: "pending",
        },
        {
          id: "4.2",
          task: "Suspension Rebuild",
          details:
            "Refresh front forks with new seals and progressive springs.",
          status: "pending",
        },
        {
          id: "4.3",
          task: "Brake System",
          details:
            "Rebuild Brembo/ATE calipers; install stainless braided lines.",
          status: "pending",
        },
        {
          id: "4.4",
          task: "Wheels & Tires",
          details: "Check wheel bearings and mount fresh rubber.",
          status: "pending",
        },
      ],
    },
    {
      phase: 5,
      title: "Final Integration & Electrical",
      duration: "2 Weeks",
      img: "",
      imgAlt: "",
      tasks: [
        {
          id: "5.1",
          task: "The Marriage",
          details:
            "Install engine and transmission back into the refinished frame.",
          status: "pending",
        },
        {
          id: "5.2",
          task: "Electrical System",
          details: "Install loom; test diode board and voltage regulator.",
          status: "pending",
        },
        {
          id: "5.3",
          task: "Fuel System",
          details:
            "Ultrasonic clean Bing CV carbs; replace diaphragms and O-rings.",
          status: "pending",
        },
        {
          id: "5.4",
          task: "Control Cables",
          details: "Install and lube new throttle, clutch, and choke cables.",
          status: "pending",
        },
      ],
    },
    {
      phase: 6,
      title: "Commissioning & Break-in",
      duration: "1 Week",
      img: "imageGen3.png",
      imgAlt: "concept bike",
      tasks: [
        {
          id: "6.1",
          task: "Static Timing",
          details: "Set points or electronic ignition timing.",
          status: "pending",
        },
        {
          id: "6.2",
          task: "First Fire",
          details: "Monitor oil pressure light and check for immediate leaks.",
          status: "pending",
        },
        {
          id: "6.3",
          task: "Carburetor Sync",
          details: "Balance carbs using a vacuum gauge once at operating temp.",
          status: "pending",
        },
        {
          id: "6.4",
          task: "Post-Restoration Torque",
          details: "Retorque heads and re-adjust valves after first 100 miles.",
          status: "pending",
        },
      ],
    },
  ],
};
export default tasksData;
