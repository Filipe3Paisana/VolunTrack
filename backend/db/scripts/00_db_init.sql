-- Create tables for a generic NGO database

-- Table to store information about donors
CREATE TABLE Donors (
    DonorID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    Phone TEXT,
    Address TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table to store information about donations
CREATE TABLE Donations (
    DonationID INTEGER PRIMARY KEY AUTOINCREMENT,
    DonorID INTEGER NOT NULL,
    Amount REAL NOT NULL,
    DonationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (DonorID) REFERENCES Donors(DonorID)
);

-- Table to store information about volunteers
CREATE TABLE Volunteers (
    VolunteerID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    Phone TEXT,
    Skills TEXT,
    Availability TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table to store information about events
CREATE TABLE Events (
    EventID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT,
    Date DATETIME NOT NULL,
    Location TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table to track volunteer participation in events
CREATE TABLE EventVolunteers (
    EventVolunteerID INTEGER PRIMARY KEY AUTOINCREMENT,
    EventID INTEGER NOT NULL,
    VolunteerID INTEGER NOT NULL,
    Role TEXT,
    FOREIGN KEY (EventID) REFERENCES Events(EventID),
    FOREIGN KEY (VolunteerID) REFERENCES Volunteers(VolunteerID)
);