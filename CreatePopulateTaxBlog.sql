USE master;
GO

/****** Object:  Database [TaxBlog]    Script Date: 03/08/2013 23:56:56 ******/
IF  EXISTS (SELECT name FROM sys.databases WHERE name = N'TaxBlog')
DROP DATABASE [TaxBlog]
GO

create database [TaxBlog]
go
use [TaxBlog]
go

CREATE TABLE [dbo].[Person](
	[PersonId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](100) NOT NULL,
	[FamilyName] [nvarchar](100) NOT NULL,
	[BirthDate] [date] NOT NULL,
	[Profession] [nvarchar](100) NOT NULL,
	[Telephone] [nvarchar](50) NULL,
	[Address] [nvarchar](255) NULL,
	[City] [nvarchar](255) NULL,
	[Country] [nvarchar](255) NULL,
	[Email] [nvarchar](255) NULL,
	[Twitter] [nvarchar](255) NULL,
 CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED 
(
	[PersonId] ASC
)
) ON [PRIMARY]

GO

INSERT INTO [dbo].[Person]([FirstName]             ,[FamilyName]             ,[BirthDate]             ,[Profession]             ,[Telephone]             ,[Address]             ,[City]             ,[Country]             ,[Email]             ,[Twitter])VALUES ('Jane','Doe','2006-12-02','Mechanical Engineer','1222212222','erwerwerwer 44','Bascharage','Luxembourg','erwewer@gmail.com','Toma9869')
INSERT INTO [dbo].[Person]([FirstName]             ,[FamilyName]             ,[BirthDate]             ,[Profession]             ,[Telephone]             ,[Address]             ,[City]             ,[Country]             ,[Email]             ,[Twitter])VALUES ('John','Doe','1896-12-02','Compliance officer','1231224342','eligngjal 55','Bascharage','Luxembourg','sdfsd.dfdfdf@gmail.com','')
INSERT INTO [dbo].[Person]([FirstName]             ,[FamilyName]             ,[BirthDate]             ,[Profession]             ,[Telephone]             ,[Address]             ,[City]             ,[Country]             ,[Email]             ,[Twitter])VALUES ('Bill','Billson','1996-04-09','Driver','2222','213dadasda','sdasdasd','sdadasd','','')
INSERT INTO [dbo].[Person]([FirstName]             ,[FamilyName]             ,[BirthDate]             ,[Profession]             ,[Telephone]             ,[Address]             ,[City]             ,[Country]             ,[Email]             ,[Twitter])VALUES ('Villiam','Villiamson','1986-03-05','Teacher','1232321','Vladimira Gacinovica 9','Bileca','Yugoslavia','vil.villamson@bileca.com','')

GO
USE [TaxBlog]
GO
IF object_id('Declarations') is not null
	DROP TABLE dbo.Declarations
GO
CREATE TABLE [dbo].[Declarations](
	[DeclarationId] [int] IDENTITY(1,1) NOT NULL,
	[DeclarationName] [nvarchar](50) NOT NULL,
	[DeclarationYear] [nvarchar](4) NOT NULL,
	[DeclarationNote] [nvarchar](800) NULL,
 CONSTRAINT [PK_Declaration] PRIMARY KEY CLUSTERED 
(
	[DeclarationId] ASC
)) ON [PRIMARY]

GO