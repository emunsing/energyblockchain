# README - Energy Blockchain Project

Goal:
- Create a schedule for electric devices based on private device constraints, using a blockchain for coordination between the devices. 

Ideal structure:
- Each 'device' (this could represent a home or feeder) runs a node on a private blockchain
- Each device computes a convex optimization problem that is the private, device-specific part of the scheduling problem, while a central smart contract is used to fairly/securely compute an update
- Once the schedule is finalized, it is stored on the blockchain and available for everyone to access.
- Individual devices (e.g. wifi lightbulbs and switches) can read their scheduled commitments, and switch on/off accordingly.

Broadly, this means that we can think of there being two types of actors on the system: the devices, and the smart contract. 

The devices go through these steps:
- Compute the private optimization updates which lead to consensus on the system's schedule
- Trade this information with the aggregator on the blockchain until a schedule is reached
- Once a schedule is finalized, turn the device on/off to follow the schedule

The aggregator smart contract goes through these steps:
- Post a draft set of variables for all the devices to access
- Wait for updates from all the devices, then compute  an update for the 


## Pseudocode for each component
The following roughly outlines the functions computed by each participant

**The devices**
- Loop:
  - Check the smart contract for current central variables
    - If the smart contract's variables are from a more recent time step, get them and save them
    - If not, wait and check again
  - Compute private optimization
  - Post update to the aggregator smart contract
- Once a schedule is finalized, retrieve that schedule and switch hardware off and on as needed to satisfy requirements
- *(Future work)* Smart meter posts actual consumption to a billing smart contract and automatically charges devices for the power consumed
Note that the scheduling loop and the 

**The Smart Contract(s)**
- Hold a whitelist of devices which will provide updates
- When requested, provide a schedule with timestamp for creation or None if the schedule has not yet been computed
- When requested, provide a current version of the aggregator variables or None if the schedule has already been computed for the day
- When provided with a new set of device variables, store the reported variables and take the device name off of the list of devices we are waiting for. If the list is empty, call the update function
- Update function: compute the update for the aggregator variables, and send the updated iteration number and variable to the contract holding the schedule
- If the variables have converged, save the power consumption to the schedule and set the 


The blockchain holds 2 relevant smart contracts:
- ADMM aggregation: 
  - Holds a set of central variables for each iteration of the algorithm. Recieves inputs from each device, and when all devices have submitted their updates for a step computes the new iteration's variables based on an average of all devices' proposals.
- 


- Run a private blockchain
- Each of the devices submits its private cost to the ADMM averaging step on the blockchain to get the status of the ADMM iterations (ideally using their own blockchain node)
- Once all nodes have checked in their ADMM update, they 
- Once a sufficient number of blocks have passed, the nodes pull the most recent ADMM variable status, and update their private calculation


Key components of code:

- Optimization: This creates a schedule for all the devices on the system
- Ethereum interface: Private 