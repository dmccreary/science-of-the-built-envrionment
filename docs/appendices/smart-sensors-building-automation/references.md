# References: Smart Sensors and Building Automation

1. [Building automation](https://en.wikipedia.org/wiki/Building_automation) - Wikipedia - Surveys networked sensors, controllers, and actuators that run HVAC, lighting, and security. Supports the appendix's sensor-to-action model, with sections on inputs and outputs, interoperability protocols such as BACnet and KNX, and documented security vulnerabilities.

2. [BACnet](https://en.wikipedia.org/wiki/BACnet) - Wikipedia - Describes ANSI/ASHRAE Standard 135, the open communication protocol for building automation. Supports the appendix's protocol discussion with its history, object types such as analog inputs and schedules, supported network media, and BACnet International testing.

3. [Demand-controlled ventilation](https://en.wikipedia.org/wiki/Demand-controlled_ventilation) - Wikipedia - Explains the feedback control method that adjusts ventilation to occupancy and pollutant levels. Directly supports the appendix's carbon dioxide worked example, covering CO2, humidity, and VOC sensors, central versus local control, and ASHRAE 62.1.

4. PID Controllers: Theory, Design, and Tuning (2nd Edition) - Karl J. Åström and Tore Hägglund - International Society of Automation - The authors introduced relay-feedback autotuning in 1984, which finds a loop's ultimate gain and period from a controlled oscillation. The book supports the appendix's control-loop concept and covers reset windup and loop-performance problems.

5. Fundamentals of HVAC Control Systems (2008) - Ross Montgomery and Robert McDowall - Elsevier, with ASHRAE - No single originator stands out for this topic, so this is chosen as an ASHRAE-endorsed introduction that treats the control loop as the basic building block, then covers proportional, integral, and derivative action.

6. [Energy Savings from Implementing and Commissioning Demand Control Ventilation](https://mn.gov/commerce-stat/pdfs/card-report-energy-savings-demand-control-ventilation.pdf) - Seventhwave for the Minnesota Department of Commerce - A Minnesota field study of CO2-based ventilation control. Reports median savings of 34 percent of air-handling energy in six monitored systems, recommissioning results, and simple paybacks of 4 to 8 years.

7. [Accuracy of CO2 Sensors](https://eta-publications.lbl.gov/sites/default/files/lbnl-1095e.pdf) - William Fisk, David Faulkner, and Douglas Sullivan, Lawrence Berkeley National Laboratory - Tested 44 CO2 sensors in nine California buildings against calibration gases, separating offset and gain errors. Backs the appendix's warning that sensor drift, calibration, and placement can mislead a controller.

8. [An Overview of Commercial Building Re-Tuning](https://www.pnnl.gov/sites/default/files/media/file/PNWD-SA-8413%20-%20Re-Tuning%20Overview%20Nov%2019-2008.pdf) - Michael Brambley, Pacific Northwest National Laboratory - A 2009 ASHRAE presentation defining re-tuning as low-cost operational fixes made through the control system. Relates to continuous commissioning, with a six-step process starting from trend-data analysis.

9. [Fault Detection and Diagnostics](https://faultdetection.lbl.gov/) - Lawrence Berkeley National Laboratory - Hub for research on automated detection of faulty building controls. Supports the appendix's fault-detection concept, with the Smart Energy Analytics Campaign covering over 500 million square feet, public datasets, and a study of HVAC fault prevalence.

10. [Guide to Operational Technology (OT) Security (NIST SP 800-82r3)](https://www.nist.gov/publications/guide-operational-technology-ot-security) - National Institute of Standards and Technology - Federal guidance that names building automation systems among the operational technology it covers. Relevant to the appendix's cybersecurity section, with typical system topologies, common threats and vulnerabilities, and recommended security countermeasures.
