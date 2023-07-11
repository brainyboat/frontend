interface ShipData {
  [id: number]: ShipDataEntry
}

interface ShipDataEntry {
  ship: Ship
  telemetry: Telemetry[]
}

interface Telemetry {
  id: number
  ship_id: number
  datetime: string
  longitude: number
  latitude: number
  temperature: number
  voltage: number
  velocity: number
  angle: number
}

interface Ship {
  id: number
  imai: number
  color: string
  name: string
  course?: LatLng[]
  owner: Owner
}

interface Owner {
  id: number
  username: string
}

type LatLng = [number, number]
