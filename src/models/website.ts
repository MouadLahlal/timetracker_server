export interface TrackedTime {
    [day: string]: number
}

export interface Website {
    [domain: string]: TrackedTime
}


/*
{
    "www.google.com": {
        "15.02.2024": 14536,
        "26.06.2024": 1254
    }
}
*/