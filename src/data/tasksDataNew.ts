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
          details: [
            "Focus on cable routing and wiring harness paths.",
            "Drain engine, transmission, driveshaft, and final drive oils.",
            "Remove seat, tank, battery, exhaust, and carburetors.",
            "Label every plug on the loom before disconnecting.",
            "Pull engine and transmission as a unit or separately.",
          ],
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
          details: [
            "Check for cracks near side-stand and subframe mounts.",
            "Send frame, subframe, and swingarm for refinishing.",
            "Inspect for internal rust; apply liner if necessary.",
            "Clean original bolts; replace stressed fasteners with high-tensile plated steel.",
          ],
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
          details: [
            "Measure piston-to-wall clearance; replace pushrod tube seals.",
            "Inspect valve seats; evaluate for unleaded fuel conversion.",
            "Replace rear main seal and oil pump O-ring.",
            "Inspect friction disk; grease input splines with Staburags NBU 30 PTM.",
          ],
          status: "pending",
        },
      ],
    },
    {
      phase: 4,
      title: "Rolling Chassis Reassembly",
      duration: "2-3 Weeks",
      img: "roliing.avif",
      imgAlt: "",
      tasks: [
        {
          id: "4.1",
          task: "Bearing Installation",
          details: [
            "Press in new steering head and swingarm pivot bearings.",

            "Refresh front forks with new seals and progressive springs.",
            "Rebuild Brembo/ATE calipers; install stainless braided lines.",
            "Check wheel bearings and mount fresh rubber.",
          ],
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
          details: [
            "Install engine and transmission back into the refinished frame.",
            "Install loom; test diode board and voltage regulator.",

            "Ultrasonic clean Bing CV carbs; replace diaphragms and O-rings.",
            "Install and lube new throttle, clutch, and choke cables.",
          ],
          status: "pending",
        },
      ],
    },
    {
      phase: 6,
      title: "Commissioning & Break-in",
      duration: "1 Week",
      img: "",
      imgAlt: "",
      tasks: [
        {
          id: "6.1",
          task: "Static Timing",
          details: [
            "Set points or electronic ignition timing.",
            "Monitor oil pressure light and check for immediate leaks.",
            "Balance carbs using a vacuum gauge once at operating temp.",
            "Retorque heads and re-adjust valves after first 100 miles.",
          ],
          status: "pending",
        },
      ],
    },
  ],
};
export default tasksData;
