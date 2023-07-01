/*Ver tabla usuarios */
select * from users;

/*Borrar datos de la tabla*/
truncate users;

/*Borrar datos de la tabla usuarios a partir de la id*/
delete from users where idUser = 5;

drop table if exists Users cascade;
create table Users (
	idUser integer not null auto_increment,
	userName varchar(80) not null,
    	Email varchar(80) unique not null,
	userPassword varchar(200) not null ,
	Charge varchar (50),
    	
	constraint pk_Users primary key (idUser)
);


drop table if exists TypeOfCancer cascade;
create table TypeOfCancer (
	idCancer  integer not null auto_increment,
	cancerName varchar(60),
	cancerDescription varchar(200),
	
	constraint pk_TypeOfCancer primary key (idCancer)
);


drop table if exists Cases cascade;
create table Cases (
	idCase integer not null auto_increment,
	caseName varchar(100),
	dataCase varchar(100),
	Noncoplanar boolean,
	idUser integer,
	idCancer integer,
	
	constraint pk_Cases primary key (idCase),
	constraint fk_CasesUser foreign key(idUser)
										references Users(idUser),
	constraint fk_CasesCancer foreign key(idCancer)
										references TypeOfCancer(idCancer)
);


drop table if exists Algorithm cascade;
create table Algorithm (
	idAlgorithm integer not null auto_increment,
	algorithmInfo varchar(200),
	algorithmFile varchar(200),
	idUser integer,
	
	constraint pk_Algorithm primary key (idAlgorithm),
	constraint fk_Algorithm foreign key (idUser)
										references Users(idUser)
	
);


drop table if exists Treatment cascade;
create table Treatment (
	idTreatment  integer not null auto_increment,
	treatmentInfo varchar(200),
	numberOfBeams integer,
	idAlgorithm  integer,
	idCase integer,
	
	constraint pk_Treatment primary key (idTreatment),
	constraint fk_TreatmentAlgorithm foreign key (idAlgorithm)
											references Algorithm (idAlgorithm),
	constraint fk_TreatmentCases foreign key (idCase)
											references Cases (idCase)
);


drop table if exists Organ cascade;
create table Organ (
	idOrgan integer not null auto_increment,
	organName varchar(60),
	
	constraint pk_Organ primary key (idOrgan)
);


drop table if exists OrganCase cascade;
create table OrganCase (
	numberOfVoxels integer,
	Volume float,
	idOrgan integer unique,
	idCase	integer unique,
					
	constraint fk_OrganCaseOrgan foreign key(idOrgan)
											references Organ(idOrgan),
	constraint fk_OrganCaseCases foreign key(idCase)
											references Cases(idCase)
);


drop table if exists IndexPrescription cascade;
create table IndexPrescription (
	idIndex integer not null auto_increment,
	indexName varchar(40),
	Description varchar(200),
	
	constraint pk_IndexPrescription primary key (idIndex)
	
);


drop table if exists TreatmentSummary cascade;
create table TreatmentSummary (
	indexValue float,
	idIndex integer,
	idOrgan integer,
	idCase integer,
	idTreatment integer,
	
	constraint fk_TreatmentSummaryIndex foreign key(idIndex)
												references IndexPrescription(idIndex),
	constraint fk_TreatmentSummaryOrgan foreign key(idOrgan)
												references Organ(idOrgan),
	constraint fk_TreatmentSummaryCases foreign key(idCase)
												references Cases(idCase),
	constraint fk_TreatmentSummaryTreatment foreign key(idTreatment)
												references Treatment(idTreatment)
);


drop table if exists Prescription cascade;
create table Prescription (
	idPrescription integer not null auto_increment,
	minPrescribedDose varchar(80),
	maxPrescribedDose varchar(80),
	idOrgan integer,
	idCase integer,
	idIndex integer,
	
	constraint pk_Prescription primary key (idPrescription),
	constraint fk_PrescriptionOrgan foreign key(idOrgan)
												references OrganCase(idOrgan),
	constraint fk_PrescriptionCase foreign key(idCase)
												references OrganCase(idCase),
	constraint fk_PrescriptionIndex foreign key(idIndex)
												references IndexPrescription(idIndex)
);

drop table if exists BeamTreatment cascade;
create table BeamTreatment (
	idBeam integer not null auto_increment,
	gantryAngle float,
	Couch float,
	Collimator float,
	idTreatment integer,

	constraint pk_BeamTreatmentBeam primary key (idBeam),
	constraint fk_BeamTreatmentTreatment foreign key(idTreatment)
													references Treatment(idTreatment)
);

drop table if exists Beamlet cascade;
create table Beamlet (
	idBeamlet integer not null auto_increment,
	Intensity float,
	idTreatment integer,
	idBeam integer,

	constraint pk_Beamlet primary key (idBeamlet),
	constraint fk_BeamletTreatment foreign key(idTreatment)
												references Treatment(idTreatment),
	constraint fk_BeamletBeam foreign key(idBeam)
												references BeamTreatment(idBeam)
);


drop table if exists Apperture cascade;
create table Apperture (
	idApperture integer not null auto_increment,
	axisX integer,
	axisY integer,
 	openMembrane boolean,
	Intensity float,
	idTreatment integer,
	idBeam integer,

	constraint pk_Apperture primary key (idApperture),
	constraint fk_AppertureTreatment foreign key(idTreatment)
												references Treatment(idTreatment),
	constraint fk_AppertureBeam foreign key(idBeam)
												references BeamTreatment(idBeam)
	
);