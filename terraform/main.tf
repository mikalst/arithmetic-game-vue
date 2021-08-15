terraform {
  backend "azurerm" {
    resource_group_name = "rg-jeehaw.com"
    storage_account_name = "stterraform1337"
    container_name       = "tfstate"
    key                  = "math.jeehaw.tfstate"
  }
  required_version = ">= 0.15"
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "2.72.0"
    }
  }
}
 
provider "azurerm" {
  # The "feature" block is required for AzureRM provider 2.x.
  # If you're using version 1.x, the "features" block is not allowed.
  version = "~>2.0"
  features {}
}
 
data "azurerm_client_config" "current" {}

data "azurerm_resource_group" "rg" {
  name = "rg-jeehaw.com"
}

resource "azurerm_storage_account" "sa" {
  name                     = "stmathjeehaw"
  resource_group_name      = data.azurerm_resource_group.rg.name
  location                 = data.azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "GRS"
}
output "stconstring" {
  value = azurerm_storage_account.sa.primary_connection_string
  sensitive = true
}

resource "azurerm_storage_table" "satab" {
  name                 = "stats"
  storage_account_name = azurerm_storage_account.sa.name
}
output "sttablename" {
  value = azurerm_storage_table.satab.name
}

resource "azurerm_static_site" "ss" {
  name                = "swa-math-jeehaw"
  resource_group_name = "rg-jeehaw.com"
  location            = "westeurope"
}
output "ssapikey" {
  value = azurerm_static_site.ss.api_key
}



