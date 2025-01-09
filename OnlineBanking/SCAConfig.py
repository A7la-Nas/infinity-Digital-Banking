#!/usr/bin/python
# -*- coding: utf-8 -*-

import argparse
import json
import os
import platform

"""SCAConfig.py --- Sets up SCA for visualizer builds"""

__author__ = "Pranabesh Singh"
__credits__ = ["Girish Lingarajappa Haniyamballi"]
__release_version__ = "2023.04"

__status__ = "Active Development"

# globalization fix
global __print_help
global _exit_with_errors
global _check_micro_app_presence
global _check_file_presence
global __exit_gracefully
global _check_project_properties_presence
global _check_project_project_manifest_presence
global _check_nfi_presence
global _check_global_variable_presence
global _startup_form_changer
global _update_properties_file
global _update_native_api_file
global _update_global_variables_file
global _update_project_manifest_file
global _microAppLocation
global _microAppPresence
global _directory
global locationOfProjectProperties
global locationOfNFIList
global locationOfProjectManifest
global locationOfGlobalVariables


def __print_help():
    print("")
    print("0 for no SCA")
    print("1 for HID")
    print("2 for Uniken")
    print("Usage Example : ")
    print("For no SCA setup : \"python SCAConfig.py --scaType 0\"")
    print("")
    print("Defined exit error codes : ")
    print("0 - Success")
    print("1 - Argument issue")
    print("2 - Project Validation issue")
    print("")


def _exit_with_errors():
    print("Wrong argument passed")
    __print_help()
    exit(1)


def _check_micro_app_presence(_micro_app_name):
    global _microAppLocation
    return _microAppLocation[_micro_app_name]


def _check_file_presence(_file_name):
    import os
    return os.path.isfile(_file_name)


def __exit_gracefully():
    print("")
    print("Completed Successfully !!!")


def _check_project_properties_presence(_micro_app_name):
    if _check_micro_app_presence(_micro_app_name):
        if _check_file_presence(_directory + _microAppLocation[_micro_app_name] + locationOfProjectProperties):
            return True
    return False


def _check_project_project_manifest_presence(_micro_app_name):
    if _check_micro_app_presence(_micro_app_name):
        if _check_file_presence(_directory + _microAppLocation[_micro_app_name] + locationOfProjectManifest):
            return True
    return False


def _check_nfi_presence(_micro_app_name):
    if _check_micro_app_presence(_micro_app_name):
        if _check_file_presence(_directory + _microAppLocation[_micro_app_name] + locationOfNFIList):
            return True
    return False


def _check_global_variable_presence(_micro_app_name):
    if _check_micro_app_presence(_micro_app_name):
        if _check_file_presence(_directory + _microAppLocation[_micro_app_name] + locationOfGlobalVariables):
            return True
    return False


def _startup_form_changer(current_properties_file, new_startup_form_key):
    import json
    import os
    current_properties_file = _directory + current_properties_file
    with open(current_properties_file, 'r') as f:
        _current_properties_file_data = json.load(f)
        _current_properties_file_data["startupformkey"] = new_startup_form_key
    os.remove(current_properties_file)
    with open(current_properties_file, 'w') as f:
        json.dump(_current_properties_file_data, f, indent=4)


def _update_properties_file(current_properties_file, what_2_change, new_status_2_apply):
    import json
    import os
    current_properties_file = _directory + current_properties_file
    with open(current_properties_file, 'r') as f:
        _current_properties_file_data = json.load(f)
        _current_properties_file_data['buildExclusion'][what_2_change] = new_status_2_apply
        if new_status_2_apply == False:
            del _current_properties_file_data['buildExclusion'][what_2_change]
        else:
            _current_properties_file_data['buildExclusion'][what_2_change] = "true"
    os.remove(current_properties_file)
    with open(current_properties_file, 'w') as f:
        json.dump(_current_properties_file_data, f, indent=4)


def _update_native_api_file(current_native_api_file, which_api_2_change, new_status_2_apply):
    import json
    import os
    current_native_api_file = _directory + current_native_api_file
    with open(current_native_api_file, 'r') as f:
        _current_native_api_file_data = json.load(f)
        for native_OS in _current_native_api_file_data["NativeFunctionAPI"]:
            for version in _current_native_api_file_data["NativeFunctionAPI"][native_OS]:
                for api in _current_native_api_file_data["NativeFunctionAPI"][native_OS][version]:
                    if which_api_2_change in api:
                        _current_native_api_file_data["NativeFunctionAPI"][native_OS][version][api]["enable"] \
                            = new_status_2_apply
    os.remove(current_native_api_file)
    with open(current_native_api_file, 'w') as f:
        json.dump(_current_native_api_file_data, f, indent=4)


def _update_global_variables_file(_global_variable_filename, a, b, c):
    import json
    import os
    current_global_variables = _directory + _global_variable_filename
    with open(current_global_variables, 'r') as f:
        _current_global_variables_file_data = json.load(f)
        for _variable_type in _current_global_variables_file_data:
            if _variable_type == a:
                for _variable_name in _current_global_variables_file_data[a]:
                    if _variable_name == b:
                        _current_global_variables_file_data[a][b] = c
    os.remove(current_global_variables)
    with open(current_global_variables, 'w') as f:
        json.dump(_current_global_variables_file_data, f, indent=4)


def _update_global_variables_file_for_uniken(_global_variable_filename):
    import json
    _uniken_global_variable_values = {
        "simple-variables": {
            "SCAType": "\"UNIKEN\"",
            "IscallAccesscode": "false",
            "piExtension": "true",
            "scaVendor": "\"\"",
            "unikenuserId": "\"\"",
            "logOffScenario": "false"
        },
        "collection-variables": {
            "RDNAAPI": "RDNAAPI = \"\";",
            "Controllers": "Controllers = new Map();",
            "RDNACallback": "RDNACallback = \"\";",
            "RDNAUtility": "RDNAUtility = \"\";",
            "Utility": "Utility = \"\";"
        }
    }
    
    current_global_variables = _directory + _global_variable_filename
    with open(current_global_variables, 'r') as f:
        existing_data = json.load(f)

    for key, value in _uniken_global_variable_values.items():
        existing_data[key] = value

    with open(current_global_variables, 'w') as f:
        json.dump(existing_data, f, indent=4)


def _update_project_manifest_file(_current_manifest_file, dependency_name, exclusion_required_in_build):
    import json
    import os
    _current_manifest_file = _directory + _current_manifest_file
    not_exclusion_required_in_build = False
    if exclusion_required_in_build == True:
        not_exclusion_required_in_build = False
    elif exclusion_required_in_build == False:
        not_exclusion_required_in_build = True
    with open(_current_manifest_file, 'r') as f:
        _current_manifest_file_data = json.load(f)
        for dependency in _current_manifest_file_data["dependencies"]:
            if dependency["name"] == dependency_name:
                dependency["excludeFromBuild"] = exclusion_required_in_build
                dependency["isHidden"] = not_exclusion_required_in_build
                dependency["useResources"] = not_exclusion_required_in_build
    os.remove(_current_manifest_file)
    with open(_current_manifest_file, 'w') as f:
        json.dump(_current_manifest_file_data, f, indent=4)


# variable declarations
_microAppLocation = {}
_microAppPresence = {}

# _sca_type = -1
_directory = os.getcwd()

# arg check
parser = argparse.ArgumentParser()

parser.add_argument("--scaType", type=int,
                    help="sets the Strong Customer Authentication type for visualizer build")
parser.add_argument("--workspaceDir",
                    help="the workspace directory for visualizer")

args = parser.parse_args()
_sca_type = args.scaType
_directory_ = args.workspaceDir
_platform = platform.system()
_path_seperator = "\\"

if not (isinstance(_sca_type, int)):
    print("As no valid SCA type is selected, configuring for non-SCA project.")
    _sca_type = 0
else:
    if _sca_type == 0:
        print("Configuring for non-SCA project.")
    elif _sca_type == 1:
        print("Configuring for HID project.")
    elif _sca_type == 2:
        print("Configuring for UNIKEN project.")
    elif True:
        print("Invalid selection for --scaType")
        _exit_with_errors()

if not (isinstance(_directory_, str)):
    current_dir = os.getcwd()
    _directory = os.path.abspath(os.path.join(current_dir, os.pardir))
    print("As no valid directory is passed, trying " + _directory)
else:
    if not (os.path.isdir(_directory_)):
        print("Invalid selection for --workspaceDir")
        _exit_with_errors()
    _directory = _directory_

if _platform == "Windows":
    if not (_directory[len(_directory) - 1] == "\\" or _directory[len(_directory) - 1] == "/"):
        if "\\" in _directory:
            _directory = _directory + "\\"
            _path_seperator = "\\"
        elif "/" in _directory:
            _directory = _directory + "/"
            _path_seperator = "/"
else:
    if not (_directory[len(_directory) - 1] == "/"):
        _directory = _directory + "/"
        _path_seperator = "/"

# Static definitions
# MAPaths
_microAppLocation["WireTransferMA"] = "WireTransferMA"
_microAppLocation["AboutUsMA"] = "AboutUsMA"
_microAppLocation["AccAggregationMA"] = "AccAggregationMA"
_microAppLocation["AccountSweepsMA"] = "AccountSweepsMA"
_microAppLocation["ACHMA"] = "ACHMA"
_microAppLocation["AlertSettingsMA"] = "AlertSettingsMA"
_microAppLocation["ApprovalMatrixMA"] = "ApprovalMatrixMA"
_microAppLocation["ApprovalRequestMA"] = "ApprovalRequestMA"
_microAppLocation["ArrangementsMA"] = "ArrangementsMA"
_microAppLocation["AuthenticationMA"] = "AuthenticationMA"
_microAppLocation["BillPayMA"] = "BillPayMA"
_microAppLocation["BulkPaymentsMA"] = "BulkPaymentsMA"
_microAppLocation["CampaignMA"] = "CampaignMA"
_microAppLocation["CardsMA"] = "CardsMA"
_microAppLocation["CardSmartMoney"] = "CardSmartMoney"
_microAppLocation["CommonsMA"] = "CommonsMA"
_microAppLocation["ConsentMgmtMA"] = "ConsentMgmtMA"
_microAppLocation["Corporate"] = "Corporate"
_microAppLocation["FinanceManagementMA"] = "FinanceManagementMA"
_microAppLocation["ForeignExchangeMA"] = "ForeignExchangeMA"
_microAppLocation["Homepage"] = "Homepage"
_microAppLocation["HomepageMA"] = "HomepageMA"
_microAppLocation["Login"] = "Login"
_microAppLocation["ManageArrangementsMA"] = "ManageArrangementsMA"
_microAppLocation["ManageProfileMA"] = "ManageProfileMA"
_microAppLocation["OnlineBanking"] = "OnlineBanking"
_microAppLocation["Payments"] = "Payments"
_microAppLocation["PortfolioManagementMA"] = "PortfolioManagementMA"
_microAppLocation["ResourcesMA"] = "ResourcesMA"
_microAppLocation["SavingsPotMA"] = "SavingsPotMA"
_microAppLocation["SecureMessageMA"] = "SecureMessageMA"
_microAppLocation["SelfServiceEnrolmentMA"] = "SelfServiceEnrolmentMA"
_microAppLocation["SettingsComm"] = "SettingsComm"
_microAppLocation["Shared"] = "Shared"
_microAppLocation["TradeFinanceMA"] = "TradeFinanceMA"
_microAppLocation["TransfersMA"] = "TransfersMA"
_microAppLocation["UserManagement"] = "UserManagement"
_microAppLocation["UserManagementMA"] = "UserManagementMA"
_microAppLocation["WealthManagement"] = "WealthManagement"
_microAppLocation["WealthOrderMA"] = "WealthOrderMA"
# Path to Props
locationOfProjectProperties = _path_seperator + "projectProperties.json"
locationOfNFIList = _path_seperator + "nativeapi.json"
locationOfProjectManifest = _path_seperator + "project.manifest"
locationOfGlobalVariables = _path_seperator + "globalVariables.json"

# formids
_frm_id_4_frmLogin = "h65c10a2cabc493c8ac9ef9c703d1486"
_frm_id_4_frmLoginHID = "d2290ff3858d48938cbd19960c045a3a"
_frm_id_4_frmLoginUniken = "h1bb693875af42ba9d4edc2bae28fae9"

# reusable variables
isDir = False
isFile = False
counter1 = 0
counter2 = 0
counter3 = 0
currentMicroApp = ""

# Presence checker
for microAppName in _microAppLocation:
    isDir = os.path.isdir(_directory + _microAppLocation[microAppName])
    counter1 += 1
    _microAppPresence[microAppName] = isDir
    if isDir:
        counter2 += 1
    else:
        counter3 += 1
## print("Defined MicroApps : ", counter1)
print("Found MicroApps : ", counter2)
## print("Not Found MicroApps : ", counter3)

if counter1 == 0 or counter2 == 0:
    print("Project validation failed")
    print("Please recheck the project structure")
    exit(2)

# OnlineBanking Changes
if _check_micro_app_presence("OnlineBanking"):
    print("OnlineBanking Present")
    if _check_nfi_presence("OnlineBanking"):
        print("OnlineBanking nativeapi.json Present")
        filename = _microAppLocation["OnlineBanking"] + locationOfNFIList
        if _sca_type == 0:
            _update_native_api_file(filename, "KonyHIDIntegration", False)
            _update_native_api_file(filename, "RELID", False)
            _update_native_api_file(filename, "RELIDNFI", False)
            _update_native_api_file(filename, "RELID_IDV_CORE", False)
            _update_native_api_file(filename, "RELID_IDV_SELFIE_CAPTURE", False)
        elif _sca_type == 1:
            _update_native_api_file(filename, "KonyHIDIntegration", True)
            _update_native_api_file(filename, "RELID", False)
            _update_native_api_file(filename, "RELIDNFI", False)
            _update_native_api_file(filename, "RELID_IDV_CORE", False)
            _update_native_api_file(filename, "RELID_IDV_SELFIE_CAPTURE", False)
        elif _sca_type == 2:
            _update_native_api_file(filename, "KonyHIDIntegration", False)
            _update_native_api_file(filename, "RELID", True)
            _update_native_api_file(filename, "RELIDNFI", True)
            _update_native_api_file(filename, "RELID_IDV_CORE", True)
            _update_native_api_file(filename, "RELID_IDV_SELFIE_CAPTURE", True)
        print("OnlineBanking nativeapi.json Done")
    else:
        print("OnlineBanking projectProperties.json Absent")
    if _check_global_variable_presence("OnlineBanking"):
        print("OnlineBanking globalVariables.json Present")
        filename = _microAppLocation["OnlineBanking"] + locationOfGlobalVariables
        if _sca_type == 0:
            _update_global_variables_file(filename, "simple-variables", "SCAType", '\"BASE\"')
        elif _sca_type == 1:
            _update_global_variables_file(filename, "simple-variables", "SCAType", '\"HID\"')
        elif _sca_type == 2:
            # _update_global_variables_file(filename, "simple-variables", "SCAType", '\"Uniken\"')
            _update_global_variables_file_for_uniken(filename)

        print("OnlineBanking globalVariables.json Done")
    else:
        print("OnlineBanking globalVariables.json Absent")
    if _check_project_properties_presence("OnlineBanking"):
        print("OnlineBanking projectProperties.json Present")
        filename = _microAppLocation["OnlineBanking"] + locationOfProjectProperties
        if _sca_type == 0:
            _startup_form_changer(filename, _frm_id_4_frmLogin)
        elif _sca_type == 1:
            _startup_form_changer(filename, _frm_id_4_frmLoginHID)
        elif _sca_type == 2:
            _startup_form_changer(filename, _frm_id_4_frmLoginUniken)
        print("OnlineBanking projectProperties.json Done")
    else:
        print("OnlineBanking projectProperties.json Absent")
    if _check_project_project_manifest_presence("OnlineBanking"):
        print("OnlineBanking project.manifest Present")
        filename = _microAppLocation["OnlineBanking"] + locationOfProjectManifest
        if _sca_type == 0:
            _update_project_manifest_file(filename, "ResourcesHIDMA", True)
            _update_project_manifest_file(filename, "ResourcesUnikenMA", True)
        elif _sca_type == 1:
            _update_project_manifest_file(filename, "ResourcesHIDMA", False)
            _update_project_manifest_file(filename, "ResourcesUnikenMA", True)
        elif _sca_type == 2:
            _update_project_manifest_file(filename, "ResourcesHIDMA", True)
            _update_project_manifest_file(filename, "ResourcesUnikenMA", False)
        print("OnlineBanking projectProperties.json Done")
    else:
        print("OnlineBanking projectProperties.json Absent")
else:
    print("OnlineBanking Absent")

if _check_micro_app_presence("AuthenticationMA"):
    print("AuthenticationMA Present")
    if _check_project_properties_presence("AuthenticationMA"):
        print("AuthenticationMA projectProperties.json Present")
        filename = _microAppLocation["AuthenticationMA"] + locationOfProjectProperties
        if _sca_type == 0:
            _update_properties_file(filename, "forms/desktop/AuthHIDUIModule", True)
            _update_properties_file(filename, "forms/mobile/AuthHIDUIModule", True)
            _update_properties_file(filename, "forms/desktop/AuthUnikenUIModule", True)
            _update_properties_file(filename, "forms/mobile/AuthUnikenUIModule", True)
        elif _sca_type == 1:
            _update_properties_file(filename, "forms/desktop/AuthHIDUIModule", False)
            _update_properties_file(filename, "forms/mobile/AuthHIDUIModule", False)
            _update_properties_file(filename, "forms/desktop/AuthUnikenUIModule", True)
            _update_properties_file(filename, "forms/mobile/AuthUnikenUIModule", True)
        elif _sca_type == 2:
            _update_properties_file(filename, "forms/desktop/AuthUnikenUIModule", False)
            _update_properties_file(filename, "forms/mobile/AuthUnikenUIModule", False)
            _update_properties_file(filename, "forms/desktop/AuthHIDUIModule", True)
            _update_properties_file(filename, "forms/mobile/AuthHIDUIModule", True)

        print("AuthenticationMA projectProperties.json Done")
    else:
        print("AuthenticationMA projectProperties.json Absent")
else:
    print("AuthenticationMA Absent")

if _check_micro_app_presence("SelfServiceEnrolmentMA"):
    print("SelfServiceEnrolmentMA Present")
    if _check_project_properties_presence("SelfServiceEnrolmentMA"):
        print("SelfServiceEnrolmentMA projectProperties.json Present")
        filename = _microAppLocation["SelfServiceEnrolmentMA"] + locationOfProjectProperties
        if _sca_type == 0:
            _update_properties_file(filename, "forms/mobile/EnrollHIDUIModule", True)
            _update_properties_file(filename, "forms/mobile/EnrollUnikenUIModule", True)
        elif _sca_type == 1:
            _update_properties_file(filename, "forms/mobile/EnrollHIDUIModule", False)
            _update_properties_file(filename, "forms/mobile/EnrollUnikenUIModule", True)
        elif _sca_type == 2:
            _update_properties_file(filename, "forms/mobile/EnrollUnikenUIModule", False)
            _update_properties_file(filename, "forms/mobile/EnrollHIDUIModule", True)

        print("SelfServiceEnrolmentMA projectProperties.json Done")
    else:
        print("SelfServiceEnrolmentMA projectProperties.json Absent")
   
else:
    print("SelfServiceEnrolmentMA Absent")

if _check_micro_app_presence("ManageProfileMA"):
    print("ManageProfileMA Present")
    if _check_project_properties_presence("ManageProfileMA"):
        print("ManageProfileMA projectProperties.json Present")
        filename = _microAppLocation["ManageProfileMA"] + locationOfProjectProperties
        if _sca_type == 0:
            _update_properties_file(filename, "forms/mobile/SettingsHIDUIModule", True)
            _update_properties_file(filename, "forms/desktop/SettingsHIDUIModule", True)
            _update_properties_file(filename, "forms/mobile/SettingsUnikenUIModule", True)
            _update_properties_file(filename, "forms/desktop/SettingsUnikenUIModule", True)

        elif _sca_type == 1:
            _update_properties_file(filename, "forms/mobile/SettingsHIDUIModule", False)
            _update_properties_file(filename, "forms/desktop/SettingsHIDUIModule", False)
            _update_properties_file(filename, "forms/mobile/SettingsUnikenUIModule", True)
            _update_properties_file(filename, "forms/desktop/SettingsUnikenUIModule", True)

        elif _sca_type == 2:
            _update_properties_file(filename, "forms/mobile/SettingsUnikenUIModule", False)
            _update_properties_file(filename, "forms/desktop/SettingsUnikenUIModule", False)
            _update_properties_file(filename, "forms/mobile/SettingsHIDUIModule", True)
            _update_properties_file(filename, "forms/desktop/SettingsHIDUIModule", True)

        print("ManageProfileMA projectProperties.json Done")
    else:
        print("ManageProfileMA projectProperties.json Absent")
else:
    print("ManageProfileMA Absent")


if _check_micro_app_presence("ApprovalRequestMA"):
    print("ApprovalRequestMA Present")
    if _check_project_properties_presence("ApprovalRequestMA"):
        print("ApprovalRequestMA projectProperties.json Present")
        filename = _microAppLocation["ApprovalRequestMA"] + locationOfProjectProperties
        if _sca_type == 0:
            _update_properties_file(filename, "forms/mobile/ApprovalsReqUnikenUIModule", True)
        elif _sca_type == 1:
            _update_properties_file(filename, "forms/mobile/ApprovalsReqUnikenUIModule", True)
        elif _sca_type == 2:
            _update_properties_file(filename, "forms/mobile/ApprovalsReqUnikenUIModule", False)

        print("ApprovalRequestMA projectProperties.json Done")
    else:
        print("ApprovalRequestMA projectProperties.json Absent")

else:
    print("ApprovalRequestMA Absent")



__exit_gracefully()
