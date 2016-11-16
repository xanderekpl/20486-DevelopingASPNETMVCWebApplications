<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="LocationChecker" generation="1" functional="0" release="0" Id="c5c80c04-72b4-40c4-867f-e932cbaf5e36" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="LocationCheckerGroup" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="LocationCheckerWebRole:Endpoint1" protocol="http">
          <inToChannel>
            <lBChannelMoniker name="/LocationChecker/LocationCheckerGroup/LB:LocationCheckerWebRole:Endpoint1" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="LocationCheckerWebRole:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="">
          <maps>
            <mapMoniker name="/LocationChecker/LocationCheckerGroup/MapLocationCheckerWebRole:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </maps>
        </aCS>
        <aCS name="LocationCheckerWebRoleInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/LocationChecker/LocationCheckerGroup/MapLocationCheckerWebRoleInstances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:LocationCheckerWebRole:Endpoint1">
          <toPorts>
            <inPortMoniker name="/LocationChecker/LocationCheckerGroup/LocationCheckerWebRole/Endpoint1" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapLocationCheckerWebRole:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" kind="Identity">
          <setting>
            <aCSMoniker name="/LocationChecker/LocationCheckerGroup/LocationCheckerWebRole/Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </setting>
        </map>
        <map name="MapLocationCheckerWebRoleInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/LocationChecker/LocationCheckerGroup/LocationCheckerWebRoleInstances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="LocationCheckerWebRole" generation="1" functional="0" release="0" software="C:\AllFiles\Mod13\Labfiles\Solution\PhotoSharingApplication\LocationChecker\csx\Debug\roles\LocationCheckerWebRole" entryPoint="base\x64\WaHostBootstrapper.exe" parameters="base\x64\WaIISHost.exe " memIndex="768" hostingEnvironment="frontendadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="http" portRanges="80" />
            </componentports>
            <settings>
              <aCS name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="" />
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;LocationCheckerWebRole&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;LocationCheckerWebRole&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="WCFServiceWebRole1.svclog" defaultAmount="[1000,1000,1000]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/LocationChecker/LocationCheckerGroup/LocationCheckerWebRoleInstances" />
            <sCSPolicyUpdateDomainMoniker name="/LocationChecker/LocationCheckerGroup/LocationCheckerWebRoleUpgradeDomains" />
            <sCSPolicyFaultDomainMoniker name="/LocationChecker/LocationCheckerGroup/LocationCheckerWebRoleFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyUpdateDomain name="LocationCheckerWebRoleUpgradeDomains" defaultPolicy="[5,5,5]" />
        <sCSPolicyFaultDomain name="LocationCheckerWebRoleFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="LocationCheckerWebRoleInstances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="6edd449d-4d68-4913-a195-e899b4f1a231" ref="Microsoft.RedDog.Contract\ServiceContract\LocationCheckerContract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="e491618b-56d0-420c-80d9-c06df005be41" ref="Microsoft.RedDog.Contract\Interface\LocationCheckerWebRole:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/LocationChecker/LocationCheckerGroup/LocationCheckerWebRole:Endpoint1" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>